document.addEventListener("DOMContentLoaded", () => {
    //Elements
    const numbersElement = document.querySelectorAll("#numbers > div")
    const result = document.querySelector("#result")
    const equal = document.querySelector("equal")
    const backSpace = document.querySelector("#backSpace")
    const deleteAll = document.querySelector("#delete-all")
    const light = document.getElementById('light')

    // All operators
    const operators = ["*", "-", "+", "/"]
    let isLightOn = true

    //Just to fix some mistakes
    let PtsAbrts = 0
    let quantPonto = 0

    // To use on the code
    const addCaracter = text => result.innerHTML += text
    const ultimoCaracter = () => result.innerHTML[result.innerHTML.length - 1]
    const EUmOperador = text => operators.includes(text)

    numbersElement.forEach(number => {
        number.onclick = e => {
            const caracter = e.target.innerHTML

            // To limit the caracters
            if (result.innerHTML.length > 22) return
 
            //Parentesis
            if ((caracter == '(' && result.innerHTML == '') || (caracter == '(' && ultimoCaracter() == '(')  || (caracter== '(' && EUmOperador(ultimoCaracter()))) {
                PtsAbrts++
                quantPonto = 0
                addCaracter(caracter)
            }

            if ((caracter == '(' && ultimoCaracter() == ')') || (caracter == '(' && !isNaN(ultimoCaracter()))) {
                PtsAbrts++
                quantPonto = 0
                addCaracter('*(')
            }

            if (caracter == ')' && PtsAbrts > 0 && !operators.includes(ultimoCaracter()) && ultimoCaracter() == ')' || (caracter == ')' && PtsAbrts > 0 && !isNaN(ultimoCaracter())) ) {
                PtsAbrts--
                addCaracter(caracter)
            }

            // To be able add a dot on the calculator
            if ((caracter == '.' && result.innerHTML == "") || (caracter == '.' && EUmOperador(ultimoCaracter())) || (caracter == '.' && ultimoCaracter() == '(')) {
                quantPonto++
                addCaracter('0.')
            }

            // Here still is to be able type a dot, but after any other number than zero.
            if (caracter == '.' && quantPonto == 0 && ultimoCaracter() != ')') {
                quantPonto++
                addCaracter(caracter)
            }
            // add only operators
            // That part is to make only the minus and the plus posible to be typed in the beginning
            if (EUmOperador(caracter) && result.innerHTML == "" && (caracter == '-' || caracter == '+') || EUmOperador(caracter) && !EUmOperador(ultimoCaracter()) && ultimoCaracter() != '.' && result.innerHTML != '') {
                quantPonto = 0
                addCaracter(caracter)
            }

            // That part is to make all of operators able to be typed corretly.
            if (!EUmOperador(ultimoCaracter()) && ultimoCaracter() != "." && result.innerHTML != "" && EUmOperador(caracter)) {
                quantPonto = 0
                addCaracter(caracter)
            }

            // add only not operators
            if (!EUmOperador(caracter) && caracter != '(' && caracter != ')' && caracter != '.' && ultimoCaracter() == ')') {
                addCaracter("*" + caracter)
                return
            }
            if (!EUmOperador(caracter) && caracter != '(' && caracter != ')' && caracter != '.') addCaracter(caracter)
        }
    })
    // This one is to show up the result.
    equal.onclick = () => {
        if (!isNaN(ultimoCaracter()) || ultimoCaracter() == ')') {
            for (let i = 1; i <= PtsAbrts; i++) {
                addCaracter(')')
            }
        }

        if (result.innerHTML !== "") result.innerHTML = eval(result.innerHTML)
    };
    // This one is to delete just a single character.
    backSpace.onclick = () => {
        if (result.innerHTML == "Infinity") {
            PtsAbrts = 0
            quantOp = 0
            quantPonto = 0
            result.innerHTML = ""
        }

        if (result.innerHTML.length > 0) {
            if (EUmOperador(result.innerHTML[result.innerHTML.length - 1])) quantOp--

            if (result.innerHTML[result.innerHTML.length - 1] == ".") quantPonto--
            result.innerHTML = result.innerHTML.slice(0, -1)
        }
    };
    // This one deletes all of number that are on calculator result.innerHTML.
    deleteAll.onclick = e => {
        PtsAbrts = 0
        quantOp = 0
        quantPonto = 0
        result.innerHTML = ""
    }
    // This allows that the user can switch the website mode (the dark mode or the light mode).
    light.addEventListener('click', () => {
        if (isLightOn) {
            document.body.style.backgroundColor = '#111'
            document.body.style.color = 'white'
        } else {
            document.body.style.backgroundColor = '#fff'
            document.body.style.color = 'black'
        }
        isLightOn = !isLightOn;
    });
});