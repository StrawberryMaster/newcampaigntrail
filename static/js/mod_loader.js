const overlay = document.getElementById('overlay_scr');
const customTab = document.getElementById('customTab');
const normalTab = document.getElementById('normalTab');
const customContent = document.getElementById('customContent');
const normalContent = document.getElementById('normalContent');

overlay.style.display = 'block';

const viewNormal = () => {
    normalTab.classList.add('active');
    customTab.classList.remove('active');
    normalContent.style.display = 'block';
    customContent.style.display = 'none';
};

const viewCustom = () => {
    customTab.classList.add('active');
    normalTab.classList.remove('active');
    customContent.style.display = 'block';
    normalContent.style.display = 'none';
};

customTab.addEventListener('click', viewCustom);
normalTab.addEventListener('click', viewNormal);
viewNormal();

var selectElement = document.getElementById("modSelect");

const toStaticPath = (path) => {
    if (typeof path !== "string") return path;
    return path.startsWith("/static/") ? `..${path}` : path;
};

const getFavourites = () => JSON.parse(window.localStorage.getItem("favourites") || "[]");
const setFavourites = (favs) => window.localStorage.setItem("favourites", JSON.stringify(favs));

var id_clean = (id) => id.replaceAll(" ", "_").replaceAll("!", "-");

const check_favourite = (val) => getFavourites().includes(val);

const add_favourite = (val) => {
    const favs = getFavourites();
    favs.push(val);
    setFavourites(favs);

    const id = id_clean(`#favourite_${val}_button`);
    $(id).html("<font color='white'>Favourited</font>");

    const n = $(id_clean(`#${val}_select_option`))[0];
    if (n) {
        n.setAttribute("data-tags", n.getAttribute("data-tags") + " favourite");
    }

    reconstruct();
};

const remove_favourite = (val) => {
    const favs = getFavourites();
    const index = favs.indexOf(val);
    if (index > -1) favs.splice(index, 1);
    setFavourites(favs);

    const id = id_clean(`#favourite_${val}_button`);
    $(id).html("Favourite");

    const n = $(id_clean(`#${val}_select_option`))[0];
    if (n) {
        n.setAttribute("data-tags",
            n.getAttribute("data-tags").split(" ").filter(f => f !== "favourite").join(" ")
        );
    }

    reconstruct();
};

const toggle_fav = (val) => {
    check_favourite(val) ? remove_favourite(val) : add_favourite(val);
};

const createOption = (opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.innerHTML = opt.label;
    option.id = id_clean(`${opt.value}_select_option`);

    if (opt.tags) {
        option.setAttribute("data-tags", opt.tags.join(" "));
    }
    if (opt.style) {
        option.setAttribute("style", opt.style);
    }
    if (check_favourite(opt.value)) {
        option.setAttribute("data-tags", (option.getAttribute("data-tags") || "") + " favourite");
    }
    return option;
};

const reconstruct = () => {
    const selection = $(`<select name="mod" id="modSelect222" onchange="modSelectChange()"></select>`);

    for (const opt of options) {
        selection.append(createOption(opt));
    }

    document.body.appendChild(selection[0]);
    originalOptions = $("#modSelect222 option").clone();
    $("#modSelect222").remove();
};

function loadSync(path) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();

    if (xhr.status === 200) {
        try {
            return JSON.parse(xhr.responseText.trim());
        } catch (error) {
            throw new Error('Error parsing JSON: ' + error.message);
        }
    }
    throw new Error('Request failed: ' + xhr.statusText);
}

let options;

try {
    options = loadSync("../static/json/mods.json");
} catch (error) {
    console.error('Error:', error);
    options = [];
}

const widgetsContainer = document.getElementById("widgetsContainer");

for (const opt of options) {
    const option = createOption(opt);

    const widget = document.createElement("div");
    widget.classList.add("widget");
    widget.setAttribute("mod-value", opt.value);

    if (opt.style) {
        widget.setAttribute("style", opt.style);
        widget.style.border = "solid 2px";
    }

    const fav = check_favourite(opt.value) ? "<font color='white'>Favourited</font>" : "Favourite";
    const id = id_clean(`favourite_${opt.value}_button`);

    widget.innerHTML = `
    <div class="widget_url_icon tooltip_wrap" onclick="copyModURL('${encodeURIComponent(opt.value)}')">
      🔗
      <span class="tooltip_text">Copies a permanent mod link.</span>
    </div>
    <img src='${toStaticPath(opt.image ?? "/static/mod_icons/default_placeholder.png")}' class='widget_image'></img>
    <br>
    <h3>${opt.label}</h3>
    <span>Tags: ${opt.tags.join(", ")}</span><br>
    <button class="select-button" onclick="$('#modSelect').val('${opt.value}');selection_click()">Select</button>
    <button id='${id}' class="favourite-button" onclick="toggle_fav('${opt.value}')">${fav}</button>
  `;

    widgetsContainer.appendChild(widget);
    selectElement.appendChild(option);
}

$("#mod_loader_overlay_block").click(() => {
    $("#modLoadReveal").click();
    changeFavicon("../static/34starcircle-2.png");
    document.body.style.overflow = '';
});

var copyModURL = (displayName) => {
    const url = `${window.location.origin}${window.location.pathname}?modName=${displayName}`;
    navigator.clipboard.writeText(url).catch(err => console.log(err));
};

$("#customMenu").change(() => {
    window.localStorage.setItem("mod_loader_cache", JSON.stringify({
        code_one: $("#codeset1").val(),
        code_two: $("#codeset2").val(),
        ending_code: $("#codeset3").val()
    }));
});

$("#submitMod").click(function () {
    document.body.style.overflow = '';

    if ($("#importfile")[0].value !== "") {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        reader.onload = (fle) => {
            campaignTrail_temp.dagakotowaru = atob(encode(fle.target.result));
        };
        reader.readAsText(file);
    }

    if ($("#modSelect")[0].value === "other") {
        const important_info = $("#codeset3")[0].value;
        if (important_info !== "") {
            campaignTrail_temp.multiple_endings = true;
        }
        if (!moddercheckeror) {
            evaluate($("#codeset1")[0].value);
            moddercheckeror = true;
        }
    } else {
        const client = new XMLHttpRequest();
        client.open('GET', "../static/mods/" + $("#modSelect")[0].value + "_init.html");
        client.onreadystatechange = function () {
            if (client.readyState !== XMLHttpRequest.DONE) return;
            if (client.status >= 200 && client.status < 300) {
                if (!e.readyToLoadCode1 && client.responseText.length > 0) {
                    evaluate(client.responseText);
                    e.readyToLoadCode1 = true;
                }
                return;
            }
            console.error("Failed to load mod init script:", client.status, $("#modSelect")[0].value);
        };
        client.send();
        diff_mod = true;
    }

    $("#modloaddiv")[0].style.display = 'none';
    $("#modLoadReveal")[0].style.display = 'none';
    modded = true;
});

$('.tagCheckbox').on('change', () => { filterEntries(); selection_click(); });

let selection_click = () => {
    const selectedValue = $("#modSelect").val();
    const widgets = Array.from(document.getElementsByClassName("widget"));
    const widget = widgets.find(f => f.getAttribute("mod-value") === selectedValue);

    const icon = options.find(f => f.value === selectedValue)?.image;
    changeFavicon(icon ? toStaticPath(icon) : "../static/34starcircle-2.png");

    widgets.forEach(f => f.classList.remove("selected_widget"));
    if (widget) widget.classList.add("selected_widget");
};

$("#modSelect").change(selection_click);
selection_click();

const getCustomLoader = () => JSON.parse(window.localStorage.getItem("custom_loader") || "[]");

const rebuild_custom_loader = () => {
    const area = $("#custom_loader_area");
    area.html("");

    const new_selector = document.createElement("select");
    new_selector.id = "custom_select";

    const custom = getCustomLoader();

    const null_opt = document.createElement("option");
    null_opt.innerHTML = "Other";
    null_opt.value = null;
    new_selector.appendChild(null_opt);

    for (const cu of custom) {
        const option = document.createElement("option");
        option.innerHTML = cu.name;
        option.value = cu.name;
        new_selector.appendChild(option);
    }

    area[0].appendChild(new_selector);

    new_selector.addEventListener("change", (ev) => {
        ev.preventDefault();
        const selec = getCustomLoader().find(f => f.name === new_selector.value);
        if (selec) {
            $("#codeset1").val(selec.code_one);
            $("#codeset2").val(selec.code_two);
            $("#codeset3").val(selec.ending_code);
        }
        $("#custom_loader_delete")[0].style.display = "";
    });
};

$("#custom_loader_save").click(() => {
    const custom = getCustomLoader();
    custom.push({
        name: $("#custom_loader_input").val(),
        code_one: $("#codeset1").val(),
        code_two: $("#codeset2").val(),
        ending_code: $("#codeset3").val()
    });
    window.localStorage.setItem("custom_loader", JSON.stringify(custom));
    rebuild_custom_loader();
    $("#custom_loader_delete")[0].style.display = "";
});

rebuild_custom_loader();

$("#custom_loader_delete").click(() => {
    const selection = $("#custom_select").val();
    const filtered = getCustomLoader().filter(f => f.name !== selection);
    window.localStorage.setItem("custom_loader", JSON.stringify(filtered));
    rebuild_custom_loader();
});

const cache = window.localStorage.getItem("mod_loader_cache");
if (cache) {
    window.localStorage.removeItem("mod_loader_cache");
    const cached = JSON.parse(cache);
    $("#codeset1").val(cached.code_one);
    $("#codeset2").val(cached.code_two);
    $("#codeset3").val(cached.ending_code);
}

// very important 2000n stuff
const normals = ["2000N", "2000 Redux", "2000?", "2000 Normal", "Normalverse 2000", "Where am I?", "Don't think about 1993", "Normal", "2000N?", "2000"];
let normal_mode = 0;

let normal_adjust = () => {
    const normal = Array.from(document.getElementsByClassName("widget")).find(f => f.getAttribute("mod-value") === "2000N");
    if (!normal) return;

    normal.children[2].style = `overflow: hidden;white-space: nowrap;text-overflow: clip;`;
    normal.children[2].innerHTML = normals[normal_mode];
    normal_mode = (normal_mode + 1) % normals.length;

    if ($(".campaign_trail_start_emphasis").length > 0) {
        setTimeout(normal_adjust, Math.floor(Math.random() * 500));
    }
};

normal_adjust();

$("#sort").change(() => {
    options.reverse();

    const wc = document.getElementById("widgetsContainer");
    const widgetElements = Array.from(wc.getElementsByClassName("widget"));
    widgetElements.reverse();
    wc.innerHTML = '';

    for (const widget of widgetElements) {
        wc.appendChild(widget);
    }

    const sel = document.getElementById("modSelect");
    sel.innerHTML = '';

    for (const opt of options) {
        sel.appendChild(createOption(opt));
    }

    reconstruct();
    filterEntries();
    selection_click();
});

let fullscreen = false;

$("#fullscreen_toggle").click((e) => {
    e.preventDefault();
    fullscreen = !fullscreen;
    $("#fullscreen_toggle")[0].classList.toggle("down", fullscreen);
    $(".overlay_scr")[0].classList.toggle("fullscreen", fullscreen);
});

nct_stuff.name_filter = "";

document.getElementById("searchInput").addEventListener("keyup", () => {
    nct_stuff.name_filter = document.getElementById("searchInput").value.trim().toLowerCase();
    filterEntries();
});

$("#game_start").click(() => {
    $("#modLoadReveal")[0].style.display = "none";
    $("#bigshotOn")[0].style.display = "none";
});