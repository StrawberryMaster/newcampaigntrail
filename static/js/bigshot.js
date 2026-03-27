/* global e, campaignTrail_temp, $ */

'use strict';

window.e = window.campaignTrail_temp || window.e;

let _answerEffectsIndex = null;
function buildAnswerEffectsIndex() {
    _answerEffectsIndex = new Map();

    const push = (type, arr) => {
        if (!Array.isArray(arr)) return;
        for (const item of arr) {
            const ans = item?.fields?.answer;
            if (ans == null) continue;
            if (!_answerEffectsIndex.has(ans)) _answerEffectsIndex.set(ans, []);
            _answerEffectsIndex.get(ans).push([type, item]);
        }
    };

    try {
        push("global", campaignTrail_temp?.answer_score_global_json);
        push("state", campaignTrail_temp?.answer_score_state_json);
        push("issue", campaignTrail_temp?.answer_score_issue_json);
    } catch (_) {
        // leave index null on failure; fallback to scanning if needed
    }
}

function findCandidate(pk) {
    let n = window.e.candidate_json.find(f => f.pk === pk);
    let i = window.e.candidate_json.indexOf(n);
    return [i, `${n.fields.first_name} ${n.fields.last_name}`];
}

function findAnswer(pk) {
    let n = window.e.answers_json.find(f => f.pk === pk);
    let i = window.e.answers_json.indexOf(n);
    return [i, n.fields.description];
}

function findIssue(pk) {
    let n = window.e.issues_json.find(f => f.pk === pk);
    let i = window.e.issues_json.indexOf(n);
    return [i, n.fields.name];
}

function findState(pk) {
    let n = window.e.states_json.find(f => f.pk === pk);
    let i = window.e.states_json.indexOf(n);
    return [i, n.fields.name];
}

function getEffectsHtml(answerid) {
    let effects = [];
    if (_answerEffectsIndex == null) {
        buildAnswerEffectsIndex();
    }

    if (_answerEffectsIndex && _answerEffectsIndex.has(answerid)) {
        effects = _answerEffectsIndex.get(answerid);
    } else {
        // scan arrays if index not available
        for (const item of campaignTrail_temp.answer_score_global_json || []) {
            if (item.fields.answer == answerid) effects.push(["global", item]);
        }
        for (const item of campaignTrail_temp.answer_score_state_json || []) {
            if (item.fields.answer == answerid) effects.push(["state", item]);
        }
        for (const item of campaignTrail_temp.answer_score_issue_json || []) {
            if (item.fields.answer == answerid) effects.push(["issue", item]);
        }
    }

    let mods = "";
    for (const effect of effects) {
        const type = effect[0];
        const data = effect[1].fields;

        if (type === "global") {
            const name = findCandidate(data.candidate)[1];
            const name2 = findCandidate(data.affected_candidate)[1];
            mods += `<em>Global:</em> Affects ${name2} for ${name} by ${data.global_multiplier}<br>`;
        } else if (type === "issue") {
            const name = findIssue(data.issue)[1];
            mods += `<em>Issue:</em> Affects ${name} by ${data.issue_score} with an importance of ${data.issue_importance}<br>`;
        } else if (type === "state") {
            const name1 = findState(data.state)[1];
            const test5 = findCandidate(data.affected_candidate)[1];
            const test6 = findCandidate(data.candidate)[1];
            mods += `<em>State:</em> Affects ${test5} for ${test6} in ${name1} by ${data.state_multiplier}<br>`;
        }
    }
    return mods;
}

window.benefitCheck = function (objectid) {
    let answers = [];
    if (document.getElementById("question_form")) {
        answers = Array.from(document.getElementsByClassName("game_answers")).map(f => Number(f.value));
    } else {
        let question = window.e.questions_json[window.e.question_number];
        answers = window.e.answers_json.filter(f => f.fields.question === question.pk).map(f => f.pk);
    }

    let answerid = answers[objectid];
    let mods = getEffectsHtml(answerid);

    let answerfeedback = "";
    for (let index = 0; index < (campaignTrail_temp.answer_feedback_json?.length || 0); index++) {
        if (answerid == campaignTrail_temp.answer_feedback_json[index].fields.answer) {
            answerfeedback = "<em>" + campaignTrail_temp.answer_feedback_json[index].fields.answer_feedback + "</em>";
            break;
        }
    }
    return `<h2>Answer</h2>"<em>${findAnswer(answerid)[1]}</em>"<br><h4>Feedback</h4>"${answerfeedback}"<br><h4>Effects</h4>${mods}`;
}

window.getTooltipContent = function (objectid) {
    let answers = Array.from(document.getElementsByClassName("game_answers")).map(f => Number(f.value));
    let answerid = answers[objectid];
    let mods = getEffectsHtml(answerid);
    return `<h4>Effects</h4>${mods}`;
}


window.benefitChecker = function () {
    let question = window.e.questions_json[window.e.question_number];
    let answers = window.e.answers_json.filter(f => f.fields.question === question.pk);

    let questionlength = answers.length;
    let nnn = "";
    for (let v = 0; v < questionlength; v++) {
        nnn += benefitCheck(v);
    }

    let diag = $("#dialogue");
    if (diag.length > 0) {
        diag[0].innerHTML = nnn;
        diag.dialog({
            draggable: false,
            maxHeight: 600,
            maxWidth: 500,
            minWidth: 500,
        }).parent().draggable();
    }
}

const tooltip_add = () => {
    if ($("#question_form").val() != "set") {
        $("#question_form").val("set");
        let answers = Array.from(document.getElementsByClassName("game_answers"));
        for (let i in answers) {
            const newHTM = `   <div class="tooltip"><b>[?]</b><span class="tooltiptext">${getTooltipContent(i)}</span></div> `;
            $("#question_form input")[i].outerHTML = newHTM + $("#question_form input")[i].outerHTML;
        }
    }
}

const tooltip_obs = new MutationObserver((mutationsList, observer) => {
    if (document.querySelector("#question_form") && window.nct_stuff?.tooltips !== false && campaignTrail_temp.bigshot_mode) {
        tooltip_add();
    }
});

tooltip_obs.observe(document.body, { childList: true, subtree: true });

// BIGSHOT MENU
window.difficultyChanger = function () {
    var sliderValue = parseFloat(document.getElementById("difficultySlider").value);
    sliderValue = isNaN(sliderValue) ? 0.97 : sliderValue;
    var newVal = Math.pow(sliderValue / 1000, 2);
    campaignTrail_temp.difficulty_level_multiplier = newVal;
    document.getElementById("difficultyMod").innerHTML = `Multiplier: <span contenteditable="true" id='difficulty_mult_bigshot'>${newVal.toFixed(2)}</span>`;
    updateSliderValue(newVal);
    document.getElementById('difficulty_mult_bigshot').addEventListener('input', manuallyAdjustedSlider);
}

window.manuallyAdjustedSlider = function () {
    var multiplier = parseFloat(document.getElementById("difficulty_mult_bigshot").innerText);
    multiplier = isNaN(multiplier) ? 0.97 : multiplier;
    var sliderValue = Math.sqrt(multiplier) * 1000;
    document.getElementById("difficultySlider").value = sliderValue;
    campaignTrail_temp.difficulty_level_multiplier = multiplier;
}

window.updateSliderValue = function (newVal) {
    var sliderValue = Math.sqrt(newVal) * 1000;
    let difSlider = document.getElementById("difficultySlider");
    if (difSlider) difSlider.value = sliderValue;
}

$(document).ready(function () {
    const cheatMenu = document.querySelector('.cheat_menu');
    const minimizeBtn = document.querySelector('#minimizeBtn');
    if (minimizeBtn && cheatMenu) {
        minimizeBtn.addEventListener('click', () => {
            cheatMenu.classList.toggle('minimized');
        });
    }
});

$("#bigshotSkipBtn").click((e) => {
    e.preventDefault();

    let question_count = campaignTrail_temp.global_parameter_json[0].fields.question_count;
    let requested_question = Number(document.getElementById('skiptoquestion').value);

    if (requested_question > question_count - 1) {
        let a = confirm("You are trying to go over the question limit. This will likely break unless the mod maker specifically made questions for this (possibly for CYOA). Are you sure?");
        if (!a) return;
    }
    if (requested_question < 0) {
        let a = confirm("You are trying to go below question 1. This will almost certainly break. Are you sure?");
        if (!a) return;
    }

    campaignTrail_temp.question_number = requested_question;

    let sfx = $('#sfxMeme')[0];
    if (sfx) {
        sfx.volume = 0.1;
        sfx.play().catch(() => { });
    }

    let pollmap = $("#view_electoral_map")[0];
    let resume = $("#resume_questions_button")[0];

    if (pollmap) {
        pollmap.click();
        window.setTimeout(() => { $("#resume_questions_button").click() }, 20);
    } else if (resume) {
        resume.click();
    }
});

$("#bigshot_ender").click((e) => {
    e.preventDefault();
    let question_count = campaignTrail_temp.global_parameter_json[0].fields.question_count;
    campaignTrail_temp.question_number = question_count - 1;

    let sfx = $('#sfxMeme')[0];
    if (sfx) {
        sfx.volume = 0.1;
        sfx.play().catch(() => { });
    }

    let continue_button = $("#answer_select_button")[0];
    let resume = $("#resume_questions_button")[0];
    campaignTrail_temp.answer_feedback_flg = 0;

    if (continue_button) {
        $(".game_answers")[0].click();
        continue_button.click();
    } else if (resume) {
        resume.click();
        window.setTimeout(() => {
            $(".game_answers")[0].click();
            $("#answer_select_button").click();
        }, 20);
    }
});

window.duplicate_globals = {};

$("#disableRNG").change((a) => {
    a.preventDefault();
    let checked = a.target.checked;
    if (!checked) {
        window.duplicate_globals = JSON.parse(JSON.stringify(campaignTrail_temp.global_parameter_json[0]));
        campaignTrail_temp.global_parameter_json[0].fields.global_variance = 0;
        campaignTrail_temp.global_parameter_json[0].fields.state_variance = 0;
        campaignTrail_temp.global_parameter_json[0].fields.max_swing = 0;
    } else {
        campaignTrail_temp.global_parameter_json[0] = JSON.parse(JSON.stringify(window.duplicate_globals));
    }
});

// https://stackoverflow.com/questions/8816729/javascript-equivalent-for-inverse-normal-function-eg-excels-normsinv-or-nor
function NormSInv(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r, retVal;

    if ((p < 0) || (p > 1)) {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    } else if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    return retVal;
}

$("#optimalRNG").change((a) => {
    a.preventDefault();
    let checked = a.target.checked;

    if (checked) {
        if ($("#disableRNG")[0].checked) {
            window.duplicate_globals = JSON.parse(JSON.stringify(campaignTrail_temp.global_parameter_json[0]));
        }
        $("#disableRNG")[0].checked = true;
        $("#disableRNG")[0].disabled = true;
        $("#disableRNG").trigger('change');
        $("#percentileSlider")[0].disabled = false;

        window.F = (cand) => {
            if (cand === campaignTrail_temp.candidate_id) {
                return NormSInv(Number($("#percentileValue").text()) / 100);
            } else {
                return NormSInv(Number($("#percentileValue").text()) / 100) * -1;
            }
        };
    } else {
        $("#disableRNG")[0].disabled = false;
        $("#percentileSlider")[0].disabled = false;

        window.F = () => {
            var e, t, i;
            do {
                i = (e = 2 * Math.random() - 1) * e + (t = 2 * Math.random() - 1) * t;
            } while (i >= 1 || 0 == i);
            return e * Math.sqrt(-2 * Math.log(i) / i);
        };
    }
});

$("#effectTooltips").change((a) => {
    a.preventDefault();
    let checked = a.target.checked;
    window.nct_stuff = window.nct_stuff || {};
    if (checked) {
        window.nct_stuff.tooltips = true;
        tooltip_add();
    } else {
        window.nct_stuff.tooltips = false;
    }
});

$("#percentileSlider").on("input", (e) => {
    let slider = e.target;
    $("#percentileValue").text(slider.value);
});

$("#skiptoquestion").keydown((e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        $("#bigshotSkipBtn").click();
    }
});


// autoplay + keybinds from CTS
let answerSet = new Set();
let noAnswerSet = new Set();

function setupAutoplayInput(elementId, targetSet) {
    let el = document.getElementById(elementId);
    if (el) {
        el.addEventListener("input", function (e) {
            targetSet.clear();
            const pks = e.target.value.split(/[\s,]+/).filter(Boolean);
            for (const pk of pks) {
                targetSet.add(Number(pk));
            }
        });
    }
}

setupAutoplayInput("autoplayYes", answerSet);
setupAutoplayInput("autoplayNo", noAnswerSet);

function autoplay() {
    try {
        const confirm = document.getElementById("confirm_visit_button");
        if (confirm) confirm.click();

        const questionLength = document.getElementById("question_form").children[0].children.length / 3;
        let clicked = false;

        for (let i = 0; i < questionLength; i++) {
            clicked = checkIfAnswer(i, answerSet);
            if (clicked) break;
        }

        if (!clicked) {
            for (let i = 0; i < questionLength; i++) {
                clicked = clickIfAvailable(i, noAnswerSet);
                if (clicked) break;
            }
        }

        if (clicked == false) console.log("ERROR: Cannot find answer to click!");
        campaignTrail_temp.election_json[0].fields.has_visits = false;
    } catch { }
}

let answersPickedAutoplay = new Set();

function printAutoplayClickedMessage(object) {
    const answerDesc = findAnswer(Number(object.value))[1];
    const autoplayString = "Question " + (campaignTrail_temp.question_number + 1) + ') "' + answerDesc + '" is what AUTOPLAY chose!\n';
    const autoplayStringToSave = "Question " + (campaignTrail_temp.question_number + 1) + ') "' + answerDesc + "\n\n";
    console.log(autoplayString);
    answersPickedAutoplay.add(autoplayStringToSave);
}

function printAllAnswersAutoplayPicked() {
    let finalString = "-- AUTOPLAY RESULTS --\n\n";
    const answers = Array.from(answersPickedAutoplay);
    for (let i = 0; i < answers.length; i++) finalString += answers[i];

    const autoplayTextBox = document.getElementById("autoplayAnswers");
    if (autoplayTextBox) {
        autoplayTextBox.style.display = "inline-block";
        autoplayTextBox.value = finalString;
    }
}

function checkIfAnswer(i, answerSet) {
    const object = document.getElementById("question_form").children[0].children[i * 3];
    const pk = Number(object.value);
    if (answerSet.has(pk)) {
        printAutoplayClickedMessage(object);
        object.click();
        document.getElementById("answer_select_button").click();
        let okBtn = document.getElementById("ok_button");
        if (okBtn) okBtn.click();
        return true;
    }
    return false;
}

function clickIfAvailable(i, noAnswerSet) {
    const object = document.getElementById("question_form").children[0].children[i * 3];
    const pk = Number(object.value);
    if (!noAnswerSet.has(pk)) {
        printAutoplayClickedMessage(object);
        object.click();
        document.getElementById("answer_select_button").click();
        let okBtn = document.getElementById("ok_button");
        if (okBtn) okBtn.click();
        return true;
    }
    return false;
}

let autoplayCount = 0;
let autoplayHandle = null;
let autoplayWaitHandle = null;
let autoplayPending = false;
let autoplayRequested = false;

function isQuestionSetReady() {
    try {
        if (typeof campaignTrail_temp !== "undefined" && campaignTrail_temp?.code2Loaded) return true;
        if (document.querySelectorAll("input.game_answers").length > 0) return true;
        const qf = document.querySelector("#question_form > form");
        if (qf && qf.children && qf.children.length > 0) return true;
    } catch (_) { }
    return false;
}

function enableAutoplayUI(active = false) {
    try {
        const indicator = document.getElementById("cheatIndicator");
        const menu = document.getElementById("autoplayMenu");
        if (indicator) {
            indicator.style.display = "block";
            indicator.dataset.autoplayActive = active ? "1" : "0";
            indicator.style.cursor = "pointer";
            if (active) {
                indicator.style.backgroundColor = "#ff9595";
                indicator.textContent = "AUTO-PLAY ENABLED";
            } else {
                indicator.style.backgroundColor = "#fff59d";
                indicator.textContent = "AUTO-PLAY PENDING...";
            }
        }
        if (menu) menu.style.display = "inline-block";
    } catch (_) { }
}

function disableAutoplayUI() {
    try {
        const indicator = document.getElementById("cheatIndicator");
        const menu = document.getElementById("autoplayMenu");
        if (indicator) {
            indicator.style.display = "block";
            indicator.style.backgroundColor = "#9e9e9e";
            indicator.style.cursor = "pointer";
            indicator.textContent = "AUTO-PLAY DISABLED";
            delete indicator.dataset.autoplayActive;
        }
        if (menu) menu.style.display = "none";
    } catch (_) { }
}

function stopAutoplay() {
    autoplayRequested = false;
    if (autoplayWaitHandle != null) {
        clearInterval(autoplayWaitHandle);
        autoplayWaitHandle = null;
    }
    if (autoplayHandle != null) {
        clearInterval(autoplayHandle);
        autoplayHandle = null;
    }
    autoplayPending = false;
    disableAutoplayUI();
}

function startAutoplayWhenReady() {
    if (autoplayRequested || autoplayPending || autoplayHandle != null) return;
    autoplayPending = true;
    autoplayRequested = true;
    enableAutoplayUI(false);

    if (isQuestionSetReady()) {
        setTimeout(() => {
            autoplayHandle = setInterval(autoplay, 10);
            autoplayPending = false;
            enableAutoplayUI(true);
        }, 1500);
        return;
    }

    autoplayWaitHandle = setInterval(() => {
        if (isQuestionSetReady()) {
            clearInterval(autoplayWaitHandle);
            autoplayWaitHandle = null;
            setTimeout(() => {
                autoplayHandle = setInterval(autoplay, 10);
                autoplayPending = false;
                enableAutoplayUI(true);
            }, 3000);
        }
    }, 100);
}

window.addEventListener("keydown", (e) => {
    if (!e.repeat) {
        if (e.key == "~" || e.key == "`") {
            window.benefitChecker();
        } else if (e.key == "#") {
            let cheatMenu = document.getElementById("cheatMenu");
            if (cheatMenu) cheatMenu.style.display = "inline-block";
        } else if (e.key == "@") {
            autoplayCount++;
            if (autoplayCount % 3 == 0) startAutoplayWhenReady();
        } else if (e.key == "$") {
            stopAutoplay();
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "cheatIndicator") {
        if (autoplayRequested || autoplayHandle != null) stopAutoplay();
        else startAutoplayWhenReady();
    }
});

window.turnOffVisits = function () {
    campaignTrail_temp.election_json[0].fields.has_visits = false;
    alert("Visits are now disabled");
}

window.skipQuestion = function (e) {
    e.preventDefault();
    const newQuestion = Number(document.getElementById("skipQuestionValue").value);

    if (!newQuestion) { alert("Question number cannot be blank!"); return; }
    if (newQuestion < 1) { alert("Question number cannot be < 1"); return; }
    if (newQuestion > campaignTrail_temp.questions_json.length) { alert("Question number cannot be > amount of questions"); return; }

    const cache = campaignTrail_temp.election_json[0].fields.has_visits;
    campaignTrail_temp.election_json[0].fields.has_visits = false;
    campaignTrail_temp.question_number = newQuestion - 2;
    campaignTrail_temp.skippingQuestion = true;
    document.getElementById("answer_select_button")?.click();
    campaignTrail_temp.election_json[0].fields.has_visits = cache;
}

window.addSTSSMoney = function () {
    if (campaignTrail_temp.shining_data && campaignTrail_temp.shining_data.balance !== undefined) {
        campaignTrail_temp.shining_data.balance += 1000000;
    } else {
        alert("You must be playing Sea to Shining Sea mode to use this!");
    }
}