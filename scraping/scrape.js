// RUN THIS INSIDE BROWSER CONSOLE

function extractText(text) {
    const regex = /^(.*?)(\n\s*\n\s*\n)/s;
    const match = text.match(regex);
    
    if (match && match[1]) {
        return match[1].trim();  // Removing any extra spaces or newlines at the end.
    } else {
        return text; // Return the original text if no match is found.
    }
}

// Get the holder of all the courses
let holder = document.querySelector("#content > div")
let tableAll = holder.querySelectorAll("div.row")
let table = tableAll[2]
table = table.querySelector(".col-md-12")

let courseJson = []

// Iterate through all the courses, extract data
for(let i = 1; i < table.children.length; i++) {
    let child = table.children[i];
    let courseTitle = child.querySelector("a.normal").textContent
    console.log(courseTitle)

    let courseLink = child.querySelector("a.normal").href
    console.log(courseLink)

    let creditHours = child.querySelector("span.pull-right").textContent.trim()[0]
    console.log(creditHours)

    let courseNumberElems = child.querySelectorAll("a.course-number")
    let courseNumbers = [...courseNumberElems].map(node => node.textContent);
    console.log(courseNumbers)

    let courseDescription = child.querySelector('div[style="padding-bottom: 5px;"]').textContent.trim()
    let courseDescriptionText = extractText(courseDescription)
    console.log(courseDescriptionText)

    let requirementFilledAll = child.querySelectorAll('a[class="label label-info"]')
    let requirementFilled = [...requirementFilledAll].map(node => node.textContent.trim());
    console.log(requirementFilled)

    let term = document.querySelector('option[selected="selected"]').textContent.trim()
    console.log(term)

    courseJson.push({
        "courseTitle": courseTitle,
        "creditHours": creditHours,
        "courseNumbers": courseNumbers,
        "courseDescription": courseDescriptionText,
        "requirementFilled": requirementFilled,
        "courseLink": courseLink,
        "term": term
    })
}
copy(JSON.stringify(courseJson))