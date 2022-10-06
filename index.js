const KEYBIND = ";" // set this to whatever you want idc

function callback(data) {

    function format(str) {
        str = str.replaceAll("\\left", "")
        str = str.replaceAll("\\right", "")
        str = str.replaceAll("\\", "")
        return str
    }

    const assignmentData = data.data.apiActivity.items
    console.log("Questions are: ", assignmentData)
    let answers = [];
    assignmentData.forEach((individualQuestion) => {
        //console.log(individualQuestion);
        let correctQuestionResponses = [];
        individualQuestion.questions.forEach((question) => { // gets sub question if there are multiple questions to a problem
            console.log(question.validation.valid_response.value.type)
            correctQuestionResponses.push(question.validation.valid_response.value);
        })
        answers.push(correctQuestionResponses);
    })

    console.log(answers);

    document.onkeydown = (e) => {
        if (e.key == KEYBIND) {
            let x = prompt(`What question number do you want the answer to? Q1-${answers.length}`)
            x = parseInt(x);
    
            if (x => 1 && x <= answers.length) {
                alert(`The answer to problem #${x} is: ${answers[x - 1]}\nShoot me a DM if there's a bug, or if anything looks weird.`)
                navigator.clipboard.writeText(answers[x-1])
            }
        }
    }
    
}

// Insert fetch token and request callback here.

.then((response) => response.json())
  .then((response) => {
    callback(response)
  });
