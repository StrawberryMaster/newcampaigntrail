/* global campaignTrail_temp, jQuery, $, MD5 */

'use strict';

window.campaignTrail_temp = window.campaignTrail_temp || {};
window.e = window.e || window.campaignTrail_temp;

const yearField = document.getElementById("year");
if (yearField) yearField.innerHTML = new Date().getFullYear();

let neo = false;

window.nct_stuff = window.nct_stuff || {};
window.nct_stuff.dynamicOverride = false;
window.nct_stuff.bigshot_activation = false;

$(document).ready(function() {
    // NEO mode
    neo = localStorage.getItem("bigshot_NEO") === "true";

    if (neo) {
        campaignTrail_temp.bigshot_mode = true;
    }
    
    if (typeof loadEntries === "function") {
        loadEntries();
    }
});

// ---------------------------------------------------------
// BIGSHOT CHEAT CODES
// ---------------------------------------------------------

let mobile_bigshot_data = {
    clicks: 0,
    state: localStorage.getItem("cheated") === "true" ? 1 : 0
};

$("#bigshotOn").click((e) => {
    e.preventDefault();
    alert(`ARE YOU GETTING ALL THIS [Mike]!? I'M FINALLY\nI'M FINALLY GONNA BE A BIG SHOT!!!`);
    localStorage.setItem("cheated", "true");
    campaignTrail_temp.bigshot_mode = true;
    $("#bigshotOn")[0].style.display = "none";
});

const keyCodes = [66, 73, 71, 83, 72, 79, 84, 13]; // BIGSHOT + Enter
const altCodes = [66, 83, 13]; // BS + Enter
const neoCodes = [78, 69, 79, 13]; // NEO + Enter
let counter = 0;
let alt_counter = 0;
let neo_counter = 0;
let initial = false;

var bigshot_key_handler = function(event) {
    window.nct_stuff.bigshot_activation = false;

    if (event.keyCode === neoCodes[neo_counter]) {
        window.nct_stuff.bigshot_activation = true;
        neo_counter += 1;

        if (neo_counter === neoCodes.length) {
            if (neo) {
                alert(`NOT COOL [Valued Player]! I'LL BE IN MY [Trailer]!`);
                localStorage.setItem("bigshot_NEO", false);
                window.location.reload();
            } else {
                alert(`HOLY [[Cungadero]] DO I FEEL GOOD ...`);
                campaignTrail_temp.bigshot_mode = true;
                localStorage.setItem("bigshot_NEO", true);
                neo = true;
                document.removeEventListener("keydown", bigshot_key_handler);
            }
        }
    } else {
        neo_counter = 0;
    }

    if (campaignTrail_temp.bigshot_mode) return;

    if (event.keyCode === keyCodes[counter]) {
        window.nct_stuff.bigshot_activation = true;
        counter += 1;

        if (counter === keyCodes.length) {
            if (localStorage.getItem("cheated") !== "true") {
                const a = "LOOKING FOR [Irresistible Cheat Codes] THAT WILL [Blow Your Mind!?]\nWELL [Shut Your Mouth] BECAUSE YOU ARE [A Redditor!]\nTRY A LITTLE [Friday Night Work Out]...\nTHEN I'LL SHOW YOU MY\nTHEN I'LL SHOW YOU MY\n1 LEFT.";
                counter = 0;
                localStorage.setItem("cheated", "true");
                alert(a);
                initial = true;
                return;
            } else {
                const a = initial ? `DON'T WORRY! FOR OUR [No Time Back Guaranttee]\nTHIS IS [One Cheat Code] YOU WILL [Regret] FOR THE REST OF YOUR REDDIT POST!` : `[Heaven], are you WATCHING?`;
                campaignTrail_temp.bigshot_mode = true;
                document.removeEventListener("keydown", bigshot_key_handler);
                alert(a);
                return;
            }
        }
    } else {
        counter = 0;
    }

    if (event.keyCode === altCodes[alt_counter] && localStorage.getItem("cheated") === "true") {
        window.nct_stuff.bigshot_activation = true;
        alt_counter += 1;
        if (alt_counter === altCodes.length) {
            const a = `ARE YOU GETTING ALL THIS [Mike]!? I'M FINALLY\nI'M FINALLY GONNA BE A BIG SHOT!!!`;
            campaignTrail_temp.bigshot_mode = true;
            alert(a);
            document.removeEventListener("keydown", bigshot_key_handler);
        }
        return;
    } else {
        alt_counter = 0;
    }
};

document.addEventListener('keydown', bigshot_key_handler);


// ---------------------------------------------------------
// MOD LOADER & EASTER EGGS
// ---------------------------------------------------------

const docHead = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (!docHead) return;
    if (oldLink) {
        docHead.removeChild(oldLink);
    }
    docHead.appendChild(link);
}

changeFavicon("../static/34starcircle-2.png");

let originalOptions = [];

function loadEntries() {
    $.ajax({
        type: "GET",
        url: "../static/mods/MODLOADERFILE.html",
        dataType: "text",
        success: function(response) {
            $("#mod_sel_wrapper").html(response);

            let hotload = window.localStorage.getItem("hotload");
            if (hotload) {
                try {
                    $("#modSelect")[0].value = hotload;
                    campaignTrail_temp.hotload = hotload;
                    $("#submitMod").click();
                } catch (e) {}
                window.localStorage.removeItem("hotload"); 
            }

            let link_split = window.location.href.split("?");
            if (link_split.length > 1) {
                ((link_split) => {
                    let modName = link_split[1].split("modName=");
                    if (modName.length === 1) return;
                    window.e.hotload = decodeURIComponent(modName[1]);
                    $("#modSelect")[0].value = window.e.hotload;
                    $("#submitMod").click();
                })(link_split);
            }

            originalOptions = $("#modSelect option").clone();
            filterEntries();
        },
        error: function() {
            console.log("Error loading mod loader - couldn't reach server.");
        }
    });
}

function filterEntries() {
    var selectedTags = [];
    $('.tagCheckbox:checked').each(function() {
        selectedTags.push($(this).val());
    });

    var filteredOptions = originalOptions.filter((_, option) => {
        var entryTags = $(option).data('tags');
        const nameFilter = (window.nct_stuff.name_filter || "").toLowerCase();
        const optionText = String(option?.innerText || option?.textContent || "").toLowerCase();
        const optionValue = String(option?.value || "").toLowerCase();
        const selected = optionText.includes(nameFilter) || optionValue.includes(nameFilter);

        if (selectedTags.length === 0) return true && selected;

        let det = entryTags && (containsAllTags(entryTags, selectedTags) && selected);
        return det;
    });

    let arrFiltVal = Array.from(filteredOptions).map(f => f.value);
    var $modSelect = $('#modSelect');
    $modSelect.empty().append(filteredOptions);
    $modSelect.val($modSelect.find('option:first').val());

    // Clean ID helper (for tags formatting)
    const id_clean = (id) => id.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");

    Array.from(document.getElementsByClassName("widget")).forEach(f => {
        let value = f.getAttribute("mod-value");
        let option = originalOptions.filter(id_clean(`#${value}_select_option`))[0];
        
        if (!arrFiltVal.includes(value)) {
            f.style.display = "none";
            return;
        }
        f.style.display = "";
    });
}

function containsAllTags(entryTags, selectedTags) {
    var entryTagArray = entryTags.split(' ');
    for (var i = 0; i < selectedTags.length; i++) {
        if (!entryTagArray.includes(selectedTags[i])) {
            return false;
        }
    }
    return true;
}

function uwuifier(a) {
    let b = a.split(" I ");
    if (b.length > 0) {
        for (let i in b) { if (i < b.length - 1) { b[i] += " I-I "; } }
    }
    a = b.join("");
    b = a.split("l");
    if (b.length > 0) {
        for (let i in b) { if (i < b.length - 1) { b[i] += "w"; } }
    }
    a = b.join("");
    b = a.split("r");
    if (b.length > 0) {
        for (let i in b) { if (i < b.length - 1) { b[i] += "w"; } }
    }
    a = b.join("");
    b = a.split(" t");
    if (b.length > 0) {
        for (let i in b) {
            if (i < b.length - 1) {
                if (b[Number(i) + 1][0] !== '-') b[i] += " t-t";
                else b[i] += " t";
            }
        }
    }
    a = b.join("");
    b = a.split("ow");
    if (b.length > 0) {
        for (let i in b) { if (i < b.length - 1) { b[i] += "uw"; } }
    }
    a = b.join("");
    return a;
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}


// ---------------------------------------------------------
// THEMES & QUOTES CONFIGURATION
// ---------------------------------------------------------

const num = Math.floor((Math.random() * 50) + 1);
const bgnum = Math.floor((Math.random() * 4) + 1);
const modernnum = Math.floor((Math.random() * 1) + 1);
const bernienum = Math.floor((Math.random() * 3) + 1);
const reagannum = Math.floor((Math.random() * 4) + 1);
const astronum = Math.floor((Math.random() * 6) + 1);
const breakingbadnum = Math.floor((Math.random() * 2) + 1);

const omorichoices = ["https://cdn.discordapp.com/attachments/818130397706846242/979975422706057216/omoribanner1.png", "https://cdn.discordapp.com/attachments/818130397706846242/979980497902010398/omor2.png"];
const omorichoice = choose(omorichoices);

const auschoices = ["https://cdn.discordapp.com/attachments/818130397706846242/979995935402754138/aus_ban_1.png", "https://cdn.discordapp.com/attachments/818130397706846242/979997719441571850/aus_ban_2.png"];
const auschoice = choose(auschoices);

const utnum = Math.floor((Math.random() * 2) + 1);

window.nct_stuff.themes = {
    "nct": {
        name: "NCT",
        background: "../static/images/march.jpg",
        background_cover: true,
        banner: "../static/images/banner_" + num + ".png",
        coloring_window: "#824b4b",
        coloring_container: "#512121",
        coloring_title: "#210505",
        text_col: "#fff"
    }, 
    "oldnct": {
        name: "New Campaign Trail",
        background: "../static/images/mlk.jpg",
        banner: "../static/images/banner_" + num + ".png",
        coloring_window: "#ff6b6b",
        coloring_container: "#930301",
        coloring_title: ""
    },
    "shining": {
        name: "Sea to Shining Sea",
        background: "https://www.thedrive.com/content/2020/03/hsc-85-top.jpg?quality=85",
        background_cover: true,
        window_url: "/static/images/window_battleship.png",
        map_url: "/static/images/map_fleet.png",
        banner: "../static/images/banner_sea.GIF",
        coloring_window: "#2f2a51",
        coloring_container: "#242135",
        coloring_title: "#141319",
        text_col: "#fff",
    },
    "ogtheme": {
        name: "Classic",
        background: "",
        banner: "../static/images/banner_classic.png",
        coloring_window: "",
        coloring_container: "",
        coloring_title: ""
    },
    "dark": {
        name: "Batman (Dark Theme)",
        background: "../static/images/black.jpg",
        banner: "../static/images/banner_dark.png",
        coloring_window: "#b3b3b3",
        coloring_container: "#000000",
        coloring_title: "#000000",
        text_col: "white"
    },
    "patriot": {
        name: "Patriot",
        background: "../static/images/flag_background.jpg",
        banner: "../static/images/banner_patriot.jpg",
        coloring_window: "#002e94",
        coloring_container: "#00184d",
        coloring_title: "#000c26"
    },
    "Modern": {
        name: "Modern",
        background: "../static/images/bg_" + bgnum + ".jpg",
        banner: "../static/images/modern_" + modernnum + ".png",
        coloring_window: "#8D3A3D",
        coloring_container: "#4D2794",
        coloring_title: "#194260"
    },
    "amongus": {
        name: "Amogus",
        background: "../static/images/background_amogus.jpg",
        banner: "../static/images/banner_amogus.jpg",
        coloring_window: "#b3b3b3",
        coloring_container: "#858585",
        coloring_title: "#000000",
        music: "../static/audio/amogus.mp3"
    },
    "JEB!": {
        name: "JEB!",
        background: "../static/images/jebbushbg.png",
        banner: "../static/images/banner_jeb!.png",
        coloring_window: "#F5F5DC",
        coloring_container: "#FFFF8F",
        coloring_title: "#FDDA0D"
    },
    "space": {
        name: "Space",
        background: "../static/images/background_space.jpg",
        banner: "../static/images/banner_space.png",
        coloring_window: "#b3b3b3",
        coloring_container: "#000000",
        coloring_title: "#000000",
        text_col: "white",
        music: "../static/audio/space.mp3"
    },
    "civilwar": {
        name: "Civil War",
        background: "../static/images/background_civilwar.jpg",
        banner: "../static/images/banner_civilwar.png",
        coloring_window: "#ffb38c",
        coloring_container: "#401600",
        coloring_title: "#361200",
        text_col: "white",
        music: "../static/audio/civilwar.mp3"
    },
    "wildwest": {
        name: "Wild West",
        background: "../static/images/background_wildwest.png",
        banner: "../static/images/banner_wildwest.png",
        coloring_window: "#ffe8b5",
        coloring_container: "#b8ad95",
        coloring_title: "#422200",
        music: "../static/audio/wildwest.mp3"
    },
    "Bernie": {
        name: "Bernie Sanders",
        background: "../static/images/berniebg.png",
        banner: "../static/images/bernie_" + bernienum + ".png",
        coloring_window: "#f65e5e",
        coloring_container: "#ec3e3d",
        coloring_title: "#b51314"
    },
    "Reagan": {
        name: "Ronald Reagan",
        background: "../static/images/reaganbg.png",
        banner: "../static/images/reaganbanner_" + reagannum + ".png",
        coloring_window: "#0C5679",
        coloring_container: "#F28A0F",
        coloring_title: "#E5340B"
    },
    "Gore": {
        name: "Al Gore",
        background: "../static/images/algorebg.png",
        banner: "../static/images/gorebanner.png",
        coloring_window: "#005b96",
        coloring_container: "#6497b1",
        coloring_title: "#011f4b"
    },
    "ASTRO": {
        name: "Astro",
        background: "../static/images/astrobg.png",
        banner: "../static/images/astrobanner_" + astronum + ".png",
        coloring_window: "#221c69",
        coloring_container: "#431c76",
        coloring_title: "#080942"
    },
    "UT": {
        name: "Undertale",
        background: "../static/images/utbg.png",
        banner: "../static/images/utbanner_" + utnum + ".png",
        coloring_window: "#000000",
        coloring_container: "#000000",
        coloring_title: "#000000",
        text_col: "white"
    },
    "BreakingBad": {
        name: "Breaking Bad",
        background: "../static/images/breakingbadbg.png",
        banner: "../static/images/breakingbad_" + breakingbadnum + ".png",
        coloring_window: "#093009",
        coloring_container: "#1F6032",
        coloring_title: "#369457"
    },
    "Omori": {
        name: "Oyasumi",
        background: "https://wallpapercave.com/wp/wp8392690.jpg",
        banner: omorichoice,
        coloring_window: "#0b68a5",
        coloring_container: "#0b27a5",
        coloring_title: "#0060c6"
    },
    "australia": {
        name: "Down Under",
        background: "https://www.joseflebovicgallery.com/pictures/CL179-103_12.JPG?v=1492666961",
        banner: auschoice,
        coloring_window: "#fcfc49",
        coloring_container: "#13821a",
        coloring_title: "#026b1e"
    },
    "Morbius": {
        name: "Morbius",
        background: "../static/images/background_morbius.png",
        banner: "../static/images/banner_morbius.png",
        coloring_window: "#1C7D7D",
        coloring_container: "#093F3A",
        coloring_title: "#03141C"
    },
    "Celeste": {
        name: "Celeste",
        background: "../static/images/celestebg.png",
        banner: "../static/images/celestetrail.png",
        coloring_window: "#4299e6",
        coloring_container: "#34479d",
        window_url: "../static/images/celesteimgbg.png",
        coloring_title: "#260c55"
    },
    "carter": {
        name: "Carter",
        background: "https://i.imgur.com/pcmPlA7.jpeg",
        banner: "https://i.imgur.com/lXxBoP4.png",
        coloring_window: "#ffffff",
        coloring_container: "#326942",
        coloring_title: "#326942"
    },
    "Miku": {
        name: "Hatsune Miku",
        background: "../static/images/mikuwallpaper.png",
        banner: "../static/images/miku.png",
        window_url: "/static/images/mikuother.png",
        coloring_window: "#ffffff",
        coloring_container: "#86cecb",
        coloring_title: "#137a7f"
    },
    "lgbtqpride": {
        name: "Pride",
        background: "https://www.politico.eu/cdn-cgi/image/width=1200,height=675,fit=crop,quality=80,onerror=redirect,format=auto/wp-content/uploads/2021/07/24/h_57063662-scaled.jpg",
        banner: "/static/images/pride.jpg",
        coloring_window: "#380069",
        coloring_container: "#5a00a8",
        coloring_title: "#9f9f9fff"
    },
    "custom": {
        name: "Custom",
        background: "",
        banner: "",
        coloring_window: "",
        coloring_container: "",
        coloring_title: ""
    }
};

window.localStorage.setItem("christmas", 0);
if (!window.localStorage.getItem("christmas")) {
    window.localStorage.setItem("christmas", 1);
    window.nct_stuff.christmas = true;
} else {
    window.nct_stuff.christmas = window.localStorage.getItem("christmas") === "1";
}

let theme = window.localStorage.getItem("theme");
window.nct_stuff.selectedTheme = theme == null ? "nct" : theme;
let selectedTheme = window.nct_stuff.themes[window.nct_stuff.selectedTheme];

if (window.nct_stuff.christmas !== true) {
    const themePickerDiv = document.getElementById("theme_picker");
    if (themePickerDiv) {
        themePickerDiv.innerHTML = "<select id='themePicker' onchange='themePicked()'></select>";
        document.getElementById("themePicker").innerHTML += "<option value='" + window.nct_stuff.selectedTheme + "'>" + window.nct_stuff.themes[window.nct_stuff.selectedTheme].name + "</option>";
        for (let i in window.nct_stuff.themes) {
            if (i !== window.nct_stuff.selectedTheme)
                document.getElementById("themePicker").innerHTML += "<option value='" + i + "'>" + window.nct_stuff.themes[i].name + "</option>";
        }
    }
} else {
    const themePickerDiv = document.getElementById("theme_picker");
    if (themePickerDiv) themePickerDiv.style.display = 'none';
}

window.themePicked = function() {
    let sel = document.getElementById("themePicker").value;
    window.localStorage.setItem("theme", sel);
    location.reload();
}

const susnum = Math.floor((Math.random() * 8) + 1);
const stassennum = Math.floor((Math.random() * 8) + 1);
const stassenyear = ["1944", "1948", "1952", "1964", "1968", "1980", "1984", "1988", "1992"];

window.nct_stuff.quotes = [
    `"All men are created equal" - Thomas Jefferson`, `"All the Way with LBJ!"`, `"Those who make peaceful revolution impossible, make violent revolution inevitable" - John Kennedy`, 
    `"I'm Gerald Ford, and you're not."`, `"Fool me once, shame on  -  shame on you. Fool me  -  you can't get fooled again." - George W. Bush`, `"It's the economy stupid!"`, 
    `"You shall not crucify mankind upon a cross of gold." - William Jennings Bryan`, `"Politics have no relations to morals." - Machiavelli`, 
    `"I am not going to exploit, for political purposes, my opponent's youth and inexperience." - Ronald Reagan`, `"There are weapons of mass destruction in Iraq." - George W. Bush`, 
    `"That was really uncalled for, Senator." - Dan Quayle`, `"My failures have been error in judgement, not intent." - Ulysses S. Grant`, 
    `"When the president does it, that means it is not illegal" - Richard Nixon`, `"Leave nothing for tomorrow which can be done today" - Abraham Lincoln`, 
    `"Extremism, in the defense of liberty, is no vice." - Barry Goldwater`, `"I've signed legislation that will outlaw Russia forever. We begin bombing in five minutes." - Ronald Reagan`, 
    `"Injustice anywhere, is a threat to justice everywhere." - Martin Luther King`, `"The Dream shall never die!" - Ted Kennedy`, `"I have binders full of women!" - Mitt Romney`, 
    `"Who am I? Why am I here?" - James Stockdale`, `"Read My Lips: No New Taxes." - George HW. Bush`, `"Thomas Jefferson lives." - John Adams`, `"Tippecanoe and Tyler Too!"`, 
    `"There is no Soviet domination of eastern Europe!" - Gerald Ford`, `"Change based on principle is progress. Constant change without principle becomes chaos." - Dwight Eisenhower`, 
    `"Freedom is never more than one generation away from extinction."" - Ronald Reagan`, ` "Ladies and gentlemen, I don't know whether you fully understand that I have just been shot," - Theodore Roosevelt`, 
    `"DEWEY DEFEATS TRUMAN"`, `"Hell no, we won't go!"`, '"Hey, hey, LBJ, how many kids did you kill today?"', `"Vote for the Crook: It’s Important!`, `"Every man a king, but no one wears a crown!"`, 
    `"Keep cool with Coolidge!"`, `"Don't swap horses in the middle of the stream."`, `"Mr. Gorbachev, tear down this wall!" - Ronald Reagan`, `"Pokémon Go to the Polls!" - Hillary Clinton`, 
    `"The only thing we have to fear is fear itself." - Franklin Roosevelt`, `"Only those who have the courage to fail greatly achieve greatly." - Robert Kennedy`, `"Amnesty, acid, and abortion."`, 
    `"In your heart, you know he's right!"`, `"Give me liberty, or give me death!" - Patrick Henry`, `"Vote for Taft now, you can vote for Bryan anytime!"`, `"Vote for the crook. It's important."`, 
    `"Blaine, Blaine, James G. Blaine, The Continental Liar from the State of Maine!"`, `"I like Ike!"`, `"A house divided can not stand." - Abraham Lincoln`, 
    `"Ask not what your country can do for you- ask what you can do for your country." - John Kennedy`, `"Give me six hours to chop down a tree and I will spend four sharpening the axe" - Abraham Lincoln`
];

const quotnum = Math.floor((Math.random() * window.nct_stuff.quotes.length));
const quote = window.nct_stuff.quotes[quotnum];

// ---------------------------------------------------------
// DOM CACHE & STYLING ARCHITECTURE (CTS-STYLE)
// ---------------------------------------------------------

let correctbannerpar = document.getElementsByClassName("game_header")[0];
if (correctbannerpar) correctbannerpar.innerHTML += "<font id='wittyquote' size='4' color='white'><em>" + quote + "</em></font>";
window.corrr = correctbannerpar ? correctbannerpar.innerHTML : "";

let header = document.getElementById("header");
let gameHeader = document.getElementsByClassName("game_header")[0];
let gameWindow = document.getElementById("game_window");
let container = document.querySelector(".container");
let campaignTrailMusic = document.getElementById('campaigntrailmusic');

const dynamicStyle = document.createElement('style');
document.head.appendChild(dynamicStyle);

function updateStyling() {
    header = document.getElementById("header");
    gameWindow = document.getElementById("game_window");
    container = document.querySelector(".container");
    gameHeader = document.getElementsByClassName("game_header")[0];

    if (header) {
        if (header.src !== selectedTheme.banner) header.src = selectedTheme.banner;
        if (header.width !== 1000) header.width = 1000;
    }

    if (document.body.background !== selectedTheme.background) {
        document.body.background = selectedTheme.background;
    }

    if (gameWindow) {
        if (gameWindow.style.backgroundColor !== selectedTheme.coloring_window) {
            gameWindow.style.backgroundColor = selectedTheme.coloring_window;
        }
        if (selectedTheme.text_col != null && gameWindow.style.color !== "black") {
            gameWindow.style.color = "black";
        }
    }

    if (container) {
        if (container.style.backgroundColor !== selectedTheme.coloring_container) {
            container.style.backgroundColor = selectedTheme.coloring_container;
        }
        if (selectedTheme.text_col != null && container.style.color !== selectedTheme.text_col) {
            container.style.color = selectedTheme.text_col;
        }
    }

    if (gameHeader) {
        if (gameHeader.style.backgroundColor !== selectedTheme.coloring_title) {
            gameHeader.style.backgroundColor = selectedTheme.coloring_title;
        }
    }

    document.body.classList.remove('cts-theme', 'classic-theme');
    if (window.nct_stuff.selectedTheme === "classic" || window.nct_stuff.selectedTheme === "ogtheme") {
        document.body.classList.add('classic-theme');
    } else {
        document.body.classList.add('cts-theme');
    }
}

function updateDynamicStyle() {
    if (window.nct_stuff.dynamicOverride) return;
    
    const background_size_css = selectedTheme.background_cover ? "background-size: cover;" : "";
    let dynaStyle = `
    #header { src: ${selectedTheme.banner}; width: 1000px; }
    body { background: ${selectedTheme.background}; ${background_size_css} }
    #game_window {
        background-color: ${selectedTheme.coloring_window};
        color: black;
        background-image: ${selectedTheme.window_url ? "url(" + selectedTheme.window_url + ")" : (gameWindow ? gameWindow.style.backgroundImage : "")};
    }
    .container {
        background-color: ${selectedTheme.coloring_container};
        color: ${selectedTheme.text_col || "inherit"};
    }
    .game_header { background-color: ${selectedTheme.coloring_title}; }
    #inner_window_2, #inner_window_3, #inner_window_4, #inner_window_5 { background-color: ${selectedTheme.coloring_window}; }
    #main_content_area, #main_content_area_reading { color: ${selectedTheme.text_col || "inherit"}; }
    #main_content_area table, #menu_container { color: black; }
    `;

    // Fix for "e.ending_shadow is undefined" - make sure window.e is checked properly
    if (window.e && window.e.ending_shadow) {
        dynaStyle += `
        #final_results_description, #difficulty_mult, #overall_details_container h3, #overall_details_container h4 { text-shadow: 0px 0px 7px black; }
        #results_container h3, #results_container h4, .results_tab_header { text-shadow: 0px 0px 7px black; }
        `;
    }
    if (selectedTheme.map_url) {
        dynaStyle += `
        #map_container {
            background-image: ${selectedTheme.map_url ? "url(" + selectedTheme.map_url + ")" : `url("")`};
            background-size: cover;
        }
        `;
    }

    if (dynamicStyle.innerHTML !== dynaStyle) {
        dynamicStyle.innerHTML = dynaStyle;
    }
}

// ---------------------------------------------------------
// MUTATION OBSERVERS (CTS Theming Loop)
// ---------------------------------------------------------

let themeUpdateObserver = null;
let headerObserver = null;
let documentObserver = null;
let currentObservedHeader = null;
let currentObservedGameWindow = null;
let themeUpdateScheduled = false;
let scheduledThemeUpdateHandle = null;

function themesDiffer(a, b) {
    if (a === b) return false;
    if (!a || !b) return a !== b;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return true;
    for (const key of aKeys) {
        if (a[key] !== b[key]) return true;
    }
    return false;
}

function nodeContainsGameHeader(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (node.classList && node.classList.contains("game_header")) return true;
    return !!(node.querySelector && node.querySelector(".game_header"));
}

function hasGameHeaderMutation(mutations) {
    if (!mutations || mutations.length === 0) return false;
    for (const mutation of mutations) {
        if (mutation.type !== "childList") continue;
        for (const added of mutation.addedNodes) if (nodeContainsGameHeader(added)) return true;
        for (const removed of mutation.removedNodes) if (nodeContainsGameHeader(removed)) return true;
    }
    return !!(currentObservedHeader && !currentObservedHeader.isConnected);
}

function handleThemeUpdates() {
    if (themeUpdateScheduled) return;
    themeUpdateScheduled = true;
    if (document.hidden) {
        scheduledThemeUpdateHandle = setTimeout(() => {
            themeUpdateScheduled = false;
            scheduledThemeUpdateHandle = null;
            actuallyHandleThemeUpdates();
        }, 50);
        return;
    }
    requestAnimationFrame(() => {
        themeUpdateScheduled = false;
        actuallyHandleThemeUpdates();
    });
}

function actuallyHandleThemeUpdates() {
    if (window.nct_stuff.pauseThemeUpdates) return;
    const customOverride = window.nct_stuff.custom_override;

    if (customOverride && !window.nct_stuff.dynamicOverride && themesDiffer(customOverride, selectedTheme)) {
        window.nct_stuff.themes[window.nct_stuff.selectedTheme] = strCopy(customOverride);
        selectedTheme = window.nct_stuff.themes[window.nct_stuff.selectedTheme];
        if (gameWindow && gameWindow.style.backgroundImage !== "") {
            gameWindow.style.backgroundImage = "";
        }
        updateStyling();
    } else {
        if (window.nct_stuff.themes[window.nct_stuff.selectedTheme]) {
            selectedTheme = window.nct_stuff.themes[window.nct_stuff.selectedTheme];
        }
        if (!customOverride && window.nct_stuff.selectedTheme === "custom" && typeof modded !== "undefined" && modded && selectedTheme.window_url) {
            selectedTheme.window_url = null;
        }
    }

    const gH = document.getElementsByClassName("game_header")[0];
    if (gH) {
        if (gH.innerHTML !== window.corrr) gH.innerHTML = window.corrr;
        if (gH.style.backgroundColor !== selectedTheme.coloring_title) gH.style.backgroundColor = selectedTheme.coloring_title;
        window.corrr = gH.innerHTML;
    }
    updateDynamicStyle();
}

function observeGameHeader() {
    const gH = document.getElementsByClassName("game_header")[0];
    if (!gH) {
        currentObservedHeader = null;
        if (headerObserver) { headerObserver.disconnect(); headerObserver = null; }
        return;
    }
    if (gH === currentObservedHeader && headerObserver) return;
    if (headerObserver) headerObserver.disconnect();
    
    currentObservedHeader = gH;
    headerObserver = new MutationObserver((mutations) => {
        if (mutations.length > 0) handleThemeUpdates();
    });
    headerObserver.observe(gH, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
    handleThemeUpdates();
}

function observeGameWindow() {
    const nextGameWindow = document.getElementById("game_window");
    if (nextGameWindow === currentObservedGameWindow && themeUpdateObserver) return;
    if (themeUpdateObserver) { themeUpdateObserver.disconnect(); themeUpdateObserver = null; }
    
    currentObservedGameWindow = nextGameWindow;
    gameWindow = nextGameWindow;
    if (!nextGameWindow) return;
    
    themeUpdateObserver = new MutationObserver(() => { handleThemeUpdates(); });
    themeUpdateObserver.observe(nextGameWindow, { attributes: true, attributeFilter: ["style"] });
}

documentObserver = new MutationObserver((mutations) => {
    if (hasGameHeaderMutation(mutations)) observeGameHeader();
    const gameWindowEl = document.getElementById("game_window");
    if (gameWindowEl !== currentObservedGameWindow) {
        observeGameWindow();
        handleThemeUpdates();
    }
});

documentObserver.observe(document.body, { childList: true, subtree: true });
observeGameHeader();
observeGameWindow();

const nct_stuff_proxy = new Proxy(window.nct_stuff, {
    set(target, property, value) {
        target[property] = value;
        if (['pauseThemeUpdates', 'custom_override', 'dynamicOverride', 'selectedTheme'].includes(property)) {
            handleThemeUpdates();
        }
        return true;
    }
});
window.nct_stuff = nct_stuff_proxy;

let fallbackInterval = setInterval(() => {
    if (document.hidden) return;
    if (!currentObservedHeader || !currentObservedHeader.isConnected) observeGameHeader();
    if (!currentObservedGameWindow || !currentObservedGameWindow.isConnected) observeGameWindow();
    if (currentObservedHeader && currentObservedHeader.innerHTML !== window.corrr && !window.nct_stuff.pauseThemeUpdates) {
        handleThemeUpdates();
    }
}, 1000);

window.addEventListener('beforeunload', () => {
    if (headerObserver) headerObserver.disconnect();
    if (documentObserver) documentObserver.disconnect();
    if (themeUpdateObserver) themeUpdateObserver.disconnect();
    if (scheduledThemeUpdateHandle) clearTimeout(scheduledThemeUpdateHandle);
    if (fallbackInterval) clearInterval(fallbackInterval);
});


// ---------------------------------------------------------
// PROMETHEUS CUSTOM MENU
// ---------------------------------------------------------

window.open_first_gate = (e) => {
    e.preventDefault();
    let menu_area = $("#bonus_menu_area")[0];
    menu_area.style.display = "block";

    let th = window.localStorage.getItem("custom_theme");

    menu_area.innerHTML = `
    <div class='prometh'>
    <h3>Custom Theme Menu</h3>
    <p>Background Image URL: <input id='background_url' placeholder='Link directly to the image.' /></p>
    <p>Background Image Covers?: <input id='background_cover' type='checkbox' /></p>
    <p>Banner Image URL (suggested dimensions: 1000x303): <input id='banner_url' placeholder='Link directly to the image.' /></p>
    <p>Window Image URL (<b>OPTIONAL</b>): <input id='window_url' placeholder='Link directly to the image.' /></p>
    <p>Window Colouring: <input id='window_colour' type='color' /></p>
    <p>Container Colouring: <input id='cont_colour' type='color' /></p>
    <p>Title Colouring: <input id='title_colour' type='color' /></p>
    <p>Text Colouring: <input id='text_colour' type='color' /></p>
    <p>Override Mod Themes? (experimental): <input id='mod_override' type='checkbox' /></p>
    <button id='prometh_save'>Save</button>
    </div>
    `;

    if (th) {
        let theme = JSON.parse(th);
        $("#background_url").val(theme.background);
        $("#background_cover")[0].checked = theme.background_cover;
        $("#banner_url").val(theme.banner);
        $("#window_url").val(theme.window_url);
        $("#window_colour").val(theme.coloring_window);
        $("#cont_colour").val(theme.coloring_container);
        $("#title_colour").val(theme.coloring_title);
        $("#text_colour").val(theme.text_col);
        $("#mod_override")[0].checked = theme.mod_override;
    }

    $("#prometheus_button").off("click").click(window.open_fifth_gate);

    $("#prometh_save").click(() => {
        let theme = {
            name: "Custom",
            background: $("#background_url").val(),
            background_cover: $("#background_cover")[0].checked,
            banner: $("#banner_url").val(),
            coloring_window: $("#window_colour").val(),
            coloring_container: $("#cont_colour").val(),
            coloring_title: $("#title_colour").val(),
            text_col: $("#text_colour").val(),
            mod_override: $("#mod_override")[0].checked,
            window_url: $("#window_url").val()
        };
        window.nct_stuff.themes[window.nct_stuff.selectedTheme] = theme;
        selectedTheme = theme;
        updateStyling();
        if (theme.mod_override) {
            updateDynamicStyle();
            window.nct_stuff.custom_override = JSON.parse(JSON.stringify(theme));
        } else {
            window.nct_stuff.custom_override = null;
        }
        window.localStorage.setItem("custom_theme", JSON.stringify(theme));
    });
};

window.open_fifth_gate = (e) => {
    e.preventDefault();
    let menu_area = $("#bonus_menu_area")[0];
    menu_area.style.display = "none";
    Array.from(menu_area.children).forEach(f => f.remove());
    $("#prometheus_button").off("click").click(window.open_first_gate);
};

if (window.nct_stuff.selectedTheme === "custom") {
    let themePicker = $("#theme_picker")[0];
    if (themePicker) {
        let theme_man_button = document.createElement("p");
        theme_man_button.innerHTML = "<button id='prometheus_button'><b>Prometheus' Menu</b></button>";
        themePicker.appendChild(theme_man_button);

        let prometheusStyle = document.createElement('style');
        prometheusStyle.innerHTML = `
        #bonus_menu_area { position: relative; width: 500px; height: 200px; display: none; text-align: right; left: 45%; z-index:999; }
        .prometh { position: absolute; top: 0; right: 0; background-color: #595959; border: 3px solid black; color: white; font-family: Arial, sans-serif; width: 100%; height: 100%; overflow-y: scroll; padding: 10px; }
        `;
        document.head.appendChild(prometheusStyle);

        $("#prometheus_button").click(window.open_first_gate);

        let th = window.localStorage.getItem("custom_theme");
        if (th) {
            let theme = JSON.parse(th);
            window.nct_stuff.themes[window.nct_stuff.selectedTheme] = theme;
            selectedTheme = theme;
            updateStyling();
            if (theme.mod_override) {
                updateDynamicStyle();
                window.nct_stuff.custom_override = JSON.parse(JSON.stringify(theme));
            }
        }
    }
}

// ---------------------------------------------------------
// CTS-STYLE LOAD JSON & MENU BINDINGS
// ---------------------------------------------------------

async function loadJSON(path, varr, callback = null) {
    if (!loadJSON._pathCache) loadJSON._pathCache = new Map();
    if (!loadJSON._targetPathCache) loadJSON._targetPathCache = new Map();

    let dataPromise = loadJSON._pathCache.get(path);
    if (!dataPromise) {
        dataPromise = fetch(path).then((res) => {
            if (!res.ok) return null;
            return res.json();
        });
        loadJSON._pathCache.set(path, dataPromise);
    }

    const sourceData = await dataPromise;
    if (sourceData == null) return;

    const clonedData = (typeof structuredClone === "function") ? structuredClone(sourceData) : JSON.parse(JSON.stringify(sourceData));

    let parts = loadJSON._targetPathCache.get(varr);
    if (!parts) {
        parts = varr.split('.');
        loadJSON._targetPathCache.set(varr, parts);
    }

    let obj = window;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!obj[parts[i]]) obj[parts[i]] = {};
        obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = clonedData;

    if (callback) callback();
}

const strCopy = obj => (typeof structuredClone === "function") ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));

window.campaignTrail_temp = window.campaignTrail_temp || {};
window.ree = window.ree || {};

window.campaignTrail_temp.election_json = {};
window.campaignTrail_temp.candidate_json = {};

loadJSON("../static/json/election.json", "campaignTrail_temp.election_json", () => {
    window.ree.election_json = strCopy(campaignTrail_temp.election_json);
});
loadJSON("../static/json/candidate.json", "campaignTrail_temp.candidate_json", () => {
    window.ree.candidate_json = strCopy(campaignTrail_temp.candidate_json);
});
loadJSON("../static/json/running_mate.json", "campaignTrail_temp.running_mate_json", () => {
    window.ree.running_mate_json = strCopy(campaignTrail_temp.running_mate_json);
});
loadJSON("../static/json/opponents.json", "campaignTrail_temp.opponents_default_json", () => {
    window.ree.opponents_default_json = strCopy(campaignTrail_temp.opponents_default_json);
});
loadJSON("../static/json/opponents.json", "campaignTrail_temp.opponents_weighted_json", () => {
    window.ree.opponents_weighted_json = strCopy(campaignTrail_temp.opponents_weighted_json);
});
loadJSON("../static/json/election_list.json", "campaignTrail_temp.temp_election_list", () => {
    window.ree.temp_election_list = strCopy(campaignTrail_temp.temp_election_list);
});

window.campaignTrail_temp.difficulty_level_json = [
    { model: "campaign_trail.difficulty_level", pk: 1, fields: { name: "Cakewalk", multiplier: 1.33 } },
    { model: "campaign_trail.difficulty_level", pk: 2, fields: { name: "Very Easy", multiplier: 1.2 } },
    { model: "campaign_trail.difficulty_level", pk: 3, fields: { name: "Easy", multiplier: 1.1 } },
    { model: "campaign_trail.difficulty_level", pk: 4, fields: { name: "Normal", multiplier: 0.97 } },
    { model: "campaign_trail.difficulty_level", pk: 5, fields: { name: "Hard", multiplier: 0.95 } },
    { model: "campaign_trail.difficulty_level", pk: 6, fields: { name: "Impossible", multiplier: 0.9 } },
    { model: "campaign_trail.difficulty_level", pk: 7, fields: { name: "Unthinkable", multiplier: 0.83 } },
    { model: "campaign_trail.difficulty_level", pk: 8, fields: { name: "Blowout", multiplier: 0.75 } },
    { model: "campaign_trail.difficulty_level", pk: 9, fields: { name: "Disaster", multiplier: 0.68 } }
];

window.campaignTrail_temp.global_parameter_json = [
    {
        model: "campaign_trail.global_parameter", pk: 1, fields: {
            vote_variable: 1.125, max_swing: 0.12, start_point: 0.94, candidate_issue_weight: 10.0,
            running_mate_issue_weight: 3.0, issue_stance_1_max: -0.71, issue_stance_2_max: -0.3,
            issue_stance_3_max: -0.125, issue_stance_4_max: 0.125, issue_stance_5_max: 0.3,
            issue_stance_6_max: 0.71, global_variance: 0.01, state_variance: 0.005, question_count: 25,
            default_map_color_hex: "#C9C9C9", no_state_map_color_hex: "#999999"
        }
    }
];

window.campaignTrail_temp.candidate_dropout_json = [
    { model: "campaign_trail.candidate_dropout", pk: 1, fields: { candidate: 36, affected_candidate: 18, probability: 1.0 } }
];

window.campaignTrail_temp.show_premium = true;
window.campaignTrail_temp.premier_ab_test_version = -1;
window.campaignTrail_temp.credits = "Dan Bryan";

// Initial styling apply
if (window.nct_stuff.christmas === true) {
    window.nct_stuff.themes = {
        "christmas": {
            name: "jesus christ",
            background: "../static/images/background_christmas.jpg",
            banner: "../static/images/banner_christmas_" + susnum + ".png",
            coloring_window: "#8D3A3D",
            coloring_container: "#871d0d",
            coloring_title: "#194260",
            music: "../static/audio/christmas.mp3"
        }
    };
    window.nct_stuff.selectedTheme = "christmas";
    selectedTheme = window.nct_stuff.themes.christmas;
    updateDynamicStyle();
    if (selectedTheme.music != null && document.getElementById("music_player")) {
        document.getElementById("music_player").style.display = "";
        if (campaignTrailMusic) {
            campaignTrailMusic.src = selectedTheme.music;
            campaignTrailMusic.autoplay = true;
        }
    }
} else {
    updateStyling();
    if (selectedTheme.music != null && document.getElementById("music_player")) {
        document.getElementById("music_player").style.display = "";
        if (campaignTrailMusic) {
            campaignTrailMusic.src = selectedTheme.music;
            campaignTrailMusic.autoplay = true;
        }
    }
}