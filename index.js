const KEYBIND = ";" // set this to whatever you want idc

function callback(data) {

    function format(str) {
        str = str.replaceAll("\\left", "")
        str = str.replaceAll("\\right", "")
        str = str.replaceAll("\\", "")
        return str
    }

    const questions = data.data.apiActivity.items
    console.log("Questions are: ", questions)
    let answers = [];
    questions.forEach((question) => {
        let answerList = [];
        let root = question.questions[0].validation.valid_response.value
        if (question.questions[0].type == "clozeformula") {
            root.forEach((res) => {
                // console.log("res value:", res, res.value);
                for (let i = 0; i < res.length; i++) {
                    if (res[i].value) {
                        answerList.push(format(res[i].value))
                    }
                } 
            })
        } else if (question.questions[0].type == "mcq") {
            let answerIndexes = question.questions[0].validation.valid_response.value
            let optionIndexes = question.questions[0].options
            for (let i = 0; i < optionIndexes.length; i++) {
                if (answerIndexes.includes(optionIndexes[i].value)) {
                    answerList.push(format(optionIndexes[i].label))
                }
            }
        }
        answers.push(answerList)
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
