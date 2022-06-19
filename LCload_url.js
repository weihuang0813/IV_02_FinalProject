url1 = "https://raw.githubusercontent.com/morristlc/related_50/main/all_related1.json";
url2 = "https://raw.githubusercontent.com/morristlc/related_50/main/all_related2.json";
url3 = "https://raw.githubusercontent.com/morristlc/related_50/main/nodes50_1.json";

async function load_url() {
    try {
        data1 = await (await fetch(url1)).json();
        data2 = await (await fetch(url2)).json();
        nodes = await (await fetch(url3)).json();
        //console.log(data1);
    } catch (e) {
        // console.log('error occurs while fetching json from url');
    }
    for (let x in data1) {
        finalObj[x] = data1[x];
    }
    for (let x in data2) {
        finalObj[x] = data2[x];
    }
}


