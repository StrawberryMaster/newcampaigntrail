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

// Switch tabs
customTab.addEventListener('click', viewCustom);

normalTab.addEventListener('click', viewNormal);

viewNormal();

const options = [
    {
        "label": "Other",
        "value": "other",
        "tags": ["historical", "state", "international", "althist"]
    }, {
        "label": "1498 Florence",
        "value": "1498 Florence",
        "tags": ["historical", "international"]
    }, {
        "label": "1793 - Alternate North American Revolution",
        "value": "1793",
        "tags": ["althist"]
    }, {
        "label": "1812",
        "value": "1812",
        "tags": ["historical"]
    }, {
        "label": "1828",
        "value": "1828",
        "tags": ["historical"],
        "style": "background-color:#614e4e;color:rgb(233, 138, 138);font-weight: bold;"
    }, {
        "label": "1836",
        "value": "1836",
        "tags": ["historical"]
    }, {
        "label": "1836TX",
        "value": "1836TX",
        "tags": ["historical", "international"]
    }, {
        "label": "1848",
        "value": "1848",
        "tags": ["historical"]
    }, {
        "label": "1852",
        "value": "1852",
        "tags": ["historical"]
    }, {
        "label": "1864",
        "value": "1864",
        "tags": ["historical"],
        "style": "background-color:#003049;color:#e2e2c0;font-weight:bolder;font-family: 'Times Ne" +
                "w Roman', Times, serif;font-size:110%;"
    }, {
        "label": "1868b: Civil War Stalemate",
        "value": "1868b",
        "tags": ["althist"]
    }, {
        "label": "Sumner '68",
        "value": "Sumner1868",
        "tags": ["althist"]
    }, {
        "label": "1872",
        "value": "1872",
        "tags": ["historical"],
        "style": "color:rgb(163, 0, 163);font-style:oblique;font-weight: bold;"
    }, {
        "label": "1876",
        "value": "1876",
        "tags": ["historical"]
    }, {
        "label": "1880",
        "value": "1880",
        "tags": ["historical"]
    }, {
        "label": "1880 Hyperion",
        "value": "1880 Hyperion",
        "tags": ["althist"]
    }, {
        "label": "1884",
        "value": "1884",
        "tags": ["historical"]
    }, {
        "label": "1892",
        "value": "1892",
        "tags": ["historical"]
    }, {
        "label": "1900",
        "value": "1900Redux",
        "tags": ["historical"]
    }, {
        "label": "1900 - George Dewey",
        "value": "1900 Dewey",
        "tags": ["althist"]
    }, {
        "label": "1904 (Redux)",
        "value": "1904",
        "tags": ["historical"],
        "style": "background-color:#222222;color:#f26b21 ;font-weight:bolder;font-family: 'Times N" +
                "ew Roman', Times, serif;font-size:110%;"
    }, {
        "label": "1908",
        "value": "1908Redux",
        "tags": ["historical"]
    }, {
        "label": "1912",
        "value": "1912",
        "tags": ["historical"]
    }, {
        "label": "1912b - No Roosevelt",
        "value": "1912b",
        "tags": ["althist"]
    }, {
        "label": "1916b - Incumbent Roosevelt v Bryan",
        "value": "1916b",
        "tags": ["althist"],
        "style": "background-color:#61604e;color:rgb(202, 211, 100);font-weight: bold;"
    }, {
        "label": "1920b - 1916b sequel, Incumbent Bryan v Wood",
        "value": "1920b",
        "tags": ["althist"],
        "style": "background-color:#61604e;color:rgb(202, 211, 100);font-weight: bold;"
    }, {
        "label": "1924b - 1916b sequel, Incumbent Wood v Reed",
        "value": "1924b",
        "tags": ["althist"],
        "style": "background-color:#61604e;color:rgb(202, 211, 100);font-weight: bold;"
    }, {
        "label": "1924",
        "value": "1924",
        "tags": ["historical"]
    }, {
        "label": "1928",
        "value": "1928",
        "tags": ["historical"]
    }, {
        "label": "1932",
        "value": "1932",
        "tags": ["historical"]
    }, {
        "label": "1932 Biden",
        "value": "1932BI",
        "tags": ["althist"]
    }, {
        "label": "1932b - Baker v Curtis",
        "value": "1932b",
        "tags": ["althist"]
    }, {
        "label": "1936",
        "value": "1936",
        "tags": ["historical"]
    }, {
        "label": "1936: Every Man a King (Long vs. Landon)",
        "value": "1936B",
        "tags": ["althist"]
    }, {
        "label": "1936c - Long 3rd party",
        "value": "1936c",
        "tags": ["althist"]
    }, {
        "label": "1936L - No Lusitania (Long Only)",
        "value": "1936L",
        "tags": ["althist"]
    }, {
        "label": "1940",
        "value": "1940",
        "tags": ["historical"]
    }, {
        "label": "1944",
        "value": "1944",
        "tags": ["historical"]
    }, {
        "label": "1948N - not related to 2000N (Dewey/Warren only)",
        "value": "1948N",
        "tags": ["althist"]
    }, {
        "label": "1948 Red",
        "value": "1948Red",
        "tags": ["althist"]
    }, {
        "label": "1952",
        "value": "1952",
        "tags": ["historical"]
    }, {
        "label": "1952d - Incumbent Dewey, Stevenson v Taft",
        "value": "1952d",
        "tags": ["althist"]
    }, {
        "label": "1952 Red",
        "value": "1952Red",
        "tags": ["althist"]
    }, {
        "label": "1956",
        "value": "1956",
        "tags": ["historical"]
    }, {
        "label": "1960 - Reuther VP",
        "value": "1960k",
        "tags": ["althist"]
    }, {
        "label": "1963 South Korea",
        "value": "1963Korea",
        "tags": ["historical", "international"]
    }, {
        "label": "1964b - Rockefeller wins REP nom",
        "value": "1964b",
        "tags": ["althist"]
    }, {
        "label": "1964d - Goldwater v Wallace v McCarthy",
        "value": "1964d",
        "tags": ["althist"]
    }, {
        "label": "1964 TNO",
        "value": "1964TNO",
        "tags": ["althist"]
    }, {
        "label": "1964 Viva Kennedy",
        "value": "1964Viva",
        "tags": ["althist"],
        "style": "color:#99bbe0;background-color: #2453A5;font-family: Brush Script MT;font-size: " +
                "larger;"
    }, {
        "label": "1964 Nixon-Incumbent Nixon",
        "value": "1964n",
        "tags": ["althist"]
    }, {
        "label": "Midnight 1964",
        "value": "Midnight 1964",
        "tags": ["althist"]
    }, {
        "label": "1964 Draft Lodge",
        "value": "1964DraftLodge",
        "tags": ["althist"]
    }, {
        "label": "1964 - The Beatles",
        "value": "1964Beatles",
        "tags": ["historical"]
    }, {
        "label": "1968 Wallace Feedback",
        "value": "1968W",
        "tags": ["althist"]
    }, {
        "label": "1968 Colonel Sanders",
        "value": "1968Sand",
        "tags": ["althist"]
    }, {
        "label": "1968 Humphrey Feedback",
        "value": "1968H",
        "tags": ["althist"]
    }, {
        "label": "1968 Humphrey VPs",
        "value": "1968VP",
        "tags": ["althist"]
    }, {
        "label": "1968b - Nixon v Wallace v McCarthy",
        "value": "1968b",
        "tags": ["althist"]
    }, {
        "label": "1968 Romney",
        "value": "1968Romney",
        "tags": ["althist"]
    }, {
        "label": "1968 Landon",
        "value": "1968Landon",
        "tags": ["althist"]
    }, {
        "label": "1968 RFK",
        "value": "1968c",
        "tags": ["althist"]
    }, {
        "label": "1968 TNO",
        "value": "1968TNO",
        "tags": ["althist"]
    }, {
        "label": "1968 Viva Kennedy",
        "value": "1968Viva",
        "tags": ["althist"],
        "style": "color:#99bbe0;background-color: #2453A5;font-family: Brush Script MT;font-size: " +
                "larger;"
    }, {
        "label": "1968: Time for Choosing",
        "value": "1968TFC",
        "tags": ["althist"]
    }, {
        "label": "1970 Hawaii Senate (Fong Only)",
        "value": "1970HI",
        "tags": ["historical", "state"]
    }, {
        "label": "1971 South Korea",
        "value": "1971Korea",
        "tags": ["historical", "international"]
    }, {
        "label": "1972",
        "value": "1972",
        "tags": ["historical"],
        "style": "background-color:#7c3a0b;color:#ffc800;font-weight:bolder;"
    }, {
        "label": "1972 - Peace With Honor",
        "value": "1972 - Peace With Honor",
        "tags": ["historical"],
    }, {
        "label": "1972 Ted-Ted Kennedy VP option",
        "value": "1972_Ted",
        "tags": ["althist"]
    }, {
        "label": "1972c - Nixon v Mondale",
        "value": "1972c",
        "tags": ["althist"]
    }, {
        "label": "1̸͔́9̴̨͋7̴̭̑2̴̲͒d̷̗̓",
        "value": "1972d",
        "tags": ["althist"],
        "style": "color:#ff0000;font-style:italic;background-color: #3d2f2f;"
    }, {
        "label": "1972 RFK-RFK incumbent v Reagan",
        "value": "1972RFK",
        "tags": ["althist"]
    }, {
        "label": "1972 McGoverning - Nixon v McGovern v Wallace",
        "value": "1972Mc",
        "tags": ["althist"]
    }, {
        "label": "1972 Birch Bayh",
        "value": "1972Bayh",
        "tags": ["althist"]
    }, {
        "label": "1972 Edmund Muskie",
        "value": "1972Muskie",
        "tags": ["althist"]
    }, {
        "label": "1976 - Alternate VPs",
        "value": "1976Alt",
        "tags": ["althist"]
    }, {
        "label": "1976 Reagan - Reagan primaries Ford",
        "value": "1976Reagan",
        "tags": ["althist"]
    }, {
        "label": "1976 Rockefeller - Nelson Rockefeller v. Jerry Brown",
        "value": "1976Rock",
        "tags": ["althist"]
    }, {
        "label": "1976 Agnew",
        "value": "1976Agnew",
        "tags": ["althist"],
        "style": "color:#001D3D;font-weight: bolder;"
    }, {
        "label": "1976 Italy",
        "value": "1976Italy",
        "tags": ["historical", "international"]
    }, {
        "label": "1976 Italy (PSI)",
        "value": "1976ItalyPSI",
        "tags": ["historical", "international"]
    }, {
        "label": "1980",
        "value": "1980",
        "tags": ["historical"]
    }, {
        "label": "1980 Anderson",
        "value": "1980A",
        "tags": ["historical"]
    }, {
        "label": "1980b - Kennedy Primaries Carter",
        "value": "1980b",
        "tags": ["althist"]
    }, {
        "label": "1984",
        "value": "1984Redux",
        "tags": ["historical"]
    }, {
        "label": "1984b (Reagan Assassination)",
        "value": "1984b",
        "tags": ["althist"]
    }, {
        "label": "1988b-Bush v Jackson",
        "value": "1988b",
        "tags": ["althist"]
    }, {
        "label": "1988d-Bush v Dale Bumpers",
        "value": "1988d",
        "tags": ["althist"]
    }, {
        "label": "1988 Biden - Biden v Bush",
        "value": "1988BI",
        "tags": ["althist"]
    }, {
        "label": "1988 Iran Contra",
        "value": "1988IranContra",
        "tags": ["althist"]
    }, {
        "label": "1992 (Bush/Clinton Sides)",
        "value": "1992",
        "tags": ["historical"]
    }, {
        "label": "1992 (Perot)",
        "value": "1992P",
        "tags": ["historical"]
    }, {
        "label": "1992b - Incumbent Dukakis v Buchanan",
        "value": "1992B",
        "tags": ["althist"]
    }, {
        "label": "1993: Post-Communist USA",
        "value": "1993PC",
        "tags": ["althist"]
    }, {
        "label": "1993",
        "value": "1993D",
        "tags": ["althist"],
        "style": "font-style:italic;"
    }, {
        "label": "1996",
        "value": "1996",
        "tags": ["historical"]
    }, {
        "label": "1996 Powell",
        "value": "1996Powell",
        "tags": ["althist"]
    }, {
        "label": "1996b - 1992b sequel-Gore v Dole",
        "value": "1996b",
        "tags": ["althist"]
    }, {
        "label": "1996c - Clinton v Gingrich",
        "value": "1996c",
        "tags": ["althist"]
    }, {
        "label": "1996BR - Forbes v Bradley",
        "value": "1996BR",
        "tags": ["althist"]
    }, {
        "label": "1998 Minnesota Governor Race (Ventura only)",
        "value": "1998Minnesota",
        "tags": ["historical", "state"]
    }, {
        "label": "2000b - 1992b Sequel",
        "value": "2000b",
        "tags": ["althist"]
    }, {
        "label": "2000 - Patrick Bateman",
        "value": "2000Bateman",
        "tags": ["althist"]
    }, {
        "label": "2000N",
        "value": "2000N",
        "tags": ["althist"],
        "style": "font-weight:bolder;"
    }, {
        "label": "2001 NYC Mayoral",
        "value": "2001NYC",
        "tags": ["historical", "state"]
    }, {
        "label": "2002 Netherlands",
        "value": "2002NL",
        "tags": ["historical", "international"]
    }, {
        "label": "2004",
        "value": "2004",
        "tags": ["historical"],
        "style": "color:rgb(0, 206, 189);font-weight:bolder;"
    }, {
        "label": "2004b - Gore incumbent v McCain",
        "value": "2004b",
        "tags": ["althist"]
    }, {
        "label": "2004d - Howard Dean",
        "value": "2004d",
        "tags": ["althist"]
    }, {
        "label": "2008",
        "value": "2008",
        "tags": ["historical"],
        "style": "background-color: #5d1565;color:rgb(255, 0, 251);font-weight:bolder;"
    }, {
        "label": "2008b - Clinton v Giuliani",
        "value": "2008b",
        "tags": ["althist"]
    }, {
        "label": "2008c - Gore v McCain",
        "value": "2008c",
        "tags": ["althist"]
    }, {
        "label": "2008 Trump-Trump Dem v McCain",
        "value": "2008T",
        "tags": ["althist"]
    }, {
        "label": "2008 Breaking Bad",
        "value": "2008d",
        "tags": ["althist"]
    }, {
        "label": "2008 Spongebob",
        "value": "2008SpongeBob",
        "tags": ["althist"]
    }, {
        "label": "2012 Chris-Chan",
        "value": "2012cwc",
        "tags": ["althist"]
    }, {
        "label": "2012 South Korea",
        "value": "2012Korea",
        "tags": ["historical", "international"]
    }, {
        "label": "2014 - South wins Constitutional Con.",
        "value": "2014sv",
        "tags": ["althist"]
    }, {
        "label": "2016 4Way (Clinton/Rubio)",
        "value": "2016FourWay",
        "tags": ["althist"]
    }, {
        "label": "2016 4Way (Sanders/Trump)",
        "value": "2016FourWay2",
        "tags": ["althist"]
    }, {
        "label": "2016 Four-Way Redux (Clinton/Rubio)",
        "value": "2016FourCandidate1",
        "tags": ["althist"]
    }, {
        "label": "2016 Four-Way Redux (Trump/Sanders)",
        "value": "2016FourCandidate2",
        "tags": ["althist"]
    }, {
        "label": "2016b - Trump v Sanders",
        "value": "2016b",
        "tags": ["althist"]
    }, {
        "label": "2016c - Trump v Biden",
        "value": "2016c",
        "tags": ["althist"]
    }, {
        "label": "2016ra - Baker v Cuellar",
        "value": "2016ra",
        "tags": ["althist"]
    }, {
        "label": "2016 NC Gov",
        "value": "2016NC",
        "tags": ["historical", "state"]
    }, {
        "label": "2016 Jeb Bush",
        "value": "2016Jeb!",
        "tags": ["althist"]
    }, {
        "label": "2016 Ted Cruz",
        "value": "Cruz 2016",
        "tags": ["althist"]
    }, {
        "label": "2016 Democratic Primaries",
        "value": "2016DNC",
        "tags": ["historical"]
    }, {
        "label": "2018 GA Gov",
        "value": "2018",
        "tags": ["historical", "state"]
    }, {
        "label": "2018 Senate",
        "value": "2018senate",
        "tags": ["historical"]
    }, {
        "label": "2018 TN Senate",
        "value": "2018TN",
        "tags": ["historical"]
    }, {
        "label": "2019 North Korea",
        "value": "2019NK",
        "tags": ["historical", "international"],
        "style": "background-color:#670000;color:rgb(255, 0, 0);font-weight: bold;"
    }, {
        "label": "2020a - 2020",
        "value": "2020a",
        "tags": ["althist"]
    }, {
        "label": "2020b - Incumbent Clinton v Rubio",
        "value": "2020b",
        "tags": ["althist"]
    }, {
        "label": "2021 VA Gov",
        "value": "2021",
        "tags": ["historical", "state"]
    }, {
        "label": "2022 PA Sen",
        "value": "2022",
        "tags": ["historical", "state"]
    }, {
        "label": "2022 PA Gov",
        "value": "2022PAGov",
        "tags": ["historical", "state"]
    }, {
        "label": "2022 OH Sen",
        "value": "2022 Tim Ryan",
        "tags": ["historical", "state"]
    }, {
        "label": "2022 NY Gov",
        "value": "2022 New York Gubernatorial Election",
        "tags": ["historical", "state"]
    }, {
        "label": "2024 (Upon a Cross of Globalism)",
        "value": "2024G",
        "tags": ["althist"]
    }, {
        "label": "The Divorce Trail: Astro v. Luuwuu (2023 April Fools Day)",
        "value": "Divorce",
        "tags": ["althist"]
    }, {
        "label": "2025 Netherlands",
        "value": "2025NL",
        "tags": ["althist", "international"]
    }
];

var selectElement = document.getElementById("modSelect");

const add_favourite = (val) => {
    let favs = window.localStorage.getItem("favourites");
    favs = favs ?? "[]";
    favs = JSON.parse(favs);

    favs.push(val);

    favs = JSON.stringify(favs);
    window.localStorage.setItem("favourites", favs);

    let id = id_clean(`#favourite_${val}_button`);

    console.log()

    $(id).html("<font color='white'>Favourited</font>");

    let n = $(id_clean(`#${val}_select_option`))[0]
    if (n) {
        n.setAttribute("data-tags", n.getAttribute("data-tags") + " favourite")
    }

    reconstruct();
}

const remove_favourite = (val) => {
    let favs = window.localStorage.getItem("favourites");
    favs = favs ?? "[]";
    favs = JSON.parse(favs);

    const index = favs.indexOf(val);
    if (index > -1) {
        favs.splice(index, 1);
    }

    favs = JSON.stringify(favs);
    window.localStorage.setItem("favourites", favs);

    let id = id_clean(`#favourite_${val}_button`);

    $(id).html("Favourite");

    let n = $(id_clean(`#${val}_select_option`))[0];
    if (n) {
        let z = "";
        n.getAttribute("data-tags").split(" ").forEach(f => {
            if (f !== "favourite") z += f + " ";
        });
        z = z.trim();
        n.setAttribute("data-tags", z);
    }

    reconstruct();
}


const check_favourite = (val) => {
    let favs = window.localStorage.getItem("favourites");
    favs = favs ?? "[]";
    favs = JSON.parse(favs);

    return favs.includes(val);
}

const toggle_fav = (val) => {
    if (check_favourite(val)) {
        remove_favourite(val);
    } else add_favourite(val);
}

var id_clean = (id) => {
    id = id.replaceAll(" ", "_").replaceAll("!", "-");
    return id;
}

const reconstruct = () => {
    let selection = $(`<select name="mod" id="modSelect222" onchange="modSelectChange()"></select>`);
    for (var i = 0; i < options.length; i++) {
        let opt = options[i];

        var option = document.createElement("option");
        option.value = opt.value;
        option.innerHTML = opt.label;
        option.id = id_clean(`${opt.value}_select_option`);
        
        if (opt["tags"]) {
            option.setAttribute("data-tags", opt["tags"].join(" "));
        }
        if (opt.style) {
            option.setAttribute("style", opt.style);
        }
                
        const fav = check_favourite(opt.value) ? "<font color='white'>Favourited</font>" : "Favourite";

        if (check_favourite(opt.value)) {
            option.setAttribute("data-tags", option.getAttribute("data-tags") + " favourite")
        }
        selection.append(option);
    }

    document.body.appendChild(selection[0]);

    originalOptions = $("#modSelect222 option").clone();

    $("#modSelect222").remove();
}

for (var i = 0; i < options.length; i++) {

    let opt = options[i];

    // dropdown option

    var option = document.createElement("option");
    option.value = opt.value;
    option.innerHTML = opt.label;
    option.id = id_clean(`${opt.value}_select_option`);
    
    if (opt["tags"]) {
        option.setAttribute("data-tags", opt["tags"].join(" "));
    }
    if (opt.style) {
        option.setAttribute("style", opt.style);
    }
    
    // normal screen option

    var widget = document.createElement("div");
    widget.classList.add("widget");
    widget.setAttribute("mod-value", opt.value);
    
    const fav = check_favourite(opt.value) ? "<font color='white'>Favourited</font>" : "Favourite";

    if (check_favourite(opt.value)) {
        option.setAttribute("data-tags", option.getAttribute("data-tags") + " favourite")
    }

    let id = id_clean(`favourite_${opt.value}_button`);

    widget.innerHTML = `
        <h3>${opt.label}</h3>
        <p>Tags: ${opt.tags.join(", ")}</p>
        <button class="select-button" onclick="$('#modSelect').val('${opt.value}')">Select</button>
        <button id='${id}' class="favourite-button" onclick="toggle_fav('${opt.value}')">${fav}</button>
    `;

    var widgetsContainer = document.getElementById("widgetsContainer");

    widgetsContainer.appendChild(widget);
    selectElement.appendChild(option);
}

$("#mod_loader_overlay_block").click(()=>{
    $("#modLoadReveal").click();
    document.body.style.overflow = '';
});

$("#customMenu").change(()=>{
    let cached = {
        code_one: $("#codeset1").val(),
        code_two: $("#codeset2").val(),
        ending_code: $("#codeset3").val()
    }
    window.localStorage.setItem("mod_loader_cache", JSON.stringify(cached));
})

$("#submitMod").click(function() {

    document.body.style.overflow = '';
    if ($("#importfile")[0].value != "") {
        const content = document.querySelector('.content');
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();

        reader.onload = function(fle) {
            importedtext = fle.target.result
            importedtext = encode(importedtext)
            importedtext = atob(importedtext)
            campaignTrail_temp.dagakotowaru = importedtext
        }
        reader.readAsText(file);
    }
    if ($("#modSelect")[0].value == "other") {
        important_info = $("#codeset3")[0].value;
        if (important_info != "") {
            campaignTrail_temp.multiple_endings = true
        }
        if (!moddercheckeror) {
            evaluate($("#codeset1")[0].value)
            moddercheckeror = true
        }
    } else {
        var client = new XMLHttpRequest();
        client.open('GET', "../static/mods/" + $("#modSelect")[0].value + "_init.html");
        client.onreadystatechange = function() {
            evaluate(client.responseText)
        }
        client.send();
        diff_mod = true
    }
    $("#modloaddiv")[0].style.display = 'none'
    $("#modLoadReveal")[0].style.display = 'none'
    modded = true
})

$('.tagCheckbox').on('change', filterEntries);

const rebuild_custom_loader = () => {
    $("#custom_loader_area").html("");

    let new_selector = document.createElement("select");
    new_selector.id = "custom_select";

    let custom = window.localStorage.getItem("custom_loader") ?? "[]";
    custom = JSON.parse(custom);

    let null_opt = document.createElement("option");
    null_opt.innerHTML = "Other";
    null_opt.value = null;

    new_selector.appendChild(null_opt);

    for (let i in custom) {
        let cu = custom[i];
        let option = document.createElement("option");
        option.innerHTML = cu.name;
        option.value = cu.name;

        new_selector.appendChild(option);
    }

    $("#custom_loader_area")[0].appendChild(new_selector);

    new_selector.addEventListener("change", (e) => {
        e.preventDefault();
        let selection = new_selector.value;

        let custom = window.localStorage.getItem("custom_loader") ?? "[]";
        custom = JSON.parse(custom);

        let selec = custom.find(f=>f.name==selection);

        $("#codeset1").val(selec.code_one);
        $("#codeset2").val(selec.code_two);
        $("#codeset3").val(selec.ending_code);

        $("#custom_loader_delete")[0].style.display = "";
    })
}

$("#custom_loader_save").click(() => {
    let name = $("#custom_loader_input").val();
    let custom = window.localStorage.getItem("custom_loader") ?? "[]";
    custom = JSON.parse(custom);

    custom.push({
        name: name,
        code_one: $("#codeset1").val(),
        code_two: $("#codeset2").val(),
        ending_code: $("#codeset3").val()
    })

    window.localStorage.setItem("custom_loader", JSON.stringify(custom));

    rebuild_custom_loader();

    $("#custom_loader_delete")[0].style.display = "";
})

rebuild_custom_loader();

$("#custom_loader_delete").click(f=>{
    let selection = $("#custom_select").val();

    let custom = window.localStorage.getItem("custom_loader") ?? "[]";
    custom = JSON.parse(custom);

    let selec = custom.filter(f=>f.name!==selection);

    window.localStorage.setItem("custom_loader", JSON.stringify(selec));

    rebuild_custom_loader();

})

let cache = window.localStorage.getItem("mod_loader_cache");
if (cache) {
    window.localStorage.removeItem("mod_loader_cache");
    let cached = JSON.parse(cache);
    $("#codeset1").val(cached.code_one);
    $("#codeset2").val(cached.code_two);
    $("#codeset3").val(cached.ending_code);
}