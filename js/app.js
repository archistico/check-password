let vm = new Vue({
    el: '#app',
    data: {
        pw: '',
        consiglio: '',
        lunghezza: false,
        maiuscole: false,
        minuscole: false,
        numeri: false,
        speciali: false,
        dbase: false
    },
    methods: {
        calcola: function () {
            let pw = this.pw;
            // controlla lunghezza
            this.lunghezza = controllaLunghezza(pw);

            // controlla maiuscole
            this.maiuscole = controllaMaiuscole(pw);

            // controlla minuscole
            this.minuscole = controllaMinuscole(pw);

            // controlla numeri
            this.numeri = controllaNumeri(pw);

            // controlla caratteri speciali
            this.speciali = controllaSpeciali(pw);

            // controlla DB
            var self = this;
            $.ajax({
                type: "POST",
                url: "getPw.php",
                data: "pw=" + pw,
                dataType: "text",
                success: function (risposta) {
                    var val = (risposta.trim() == "true");
                    self.dbase = val;
                },
                error: function () {
                    alert("Chiamata fallita!!!");
                }
            });

            this.consiglio = consigliaModifiche(pw);
        }
    },
    watch: {
        pw: function () {
            this.calcola();
        }
    }
})

var chiama = function (risp) {
    return risp;
},

    controllaLunghezza = function (pw) {
        if (pw.length > 11) {
            return true
        } else {
            return false
        }
    }

controllaMaiuscole = function (pw) {
    for (i = 0; i < pw.length; i++) {
        if (pw.charCodeAt(i) > 64 && pw.charCodeAt(i) < 91) {
            return true;
        }
    }
    return false;
}

controllaMinuscole = function (pw) {
    for (i = 0; i < pw.length; i++) {
        if (pw.charCodeAt(i) > 96 && pw.charCodeAt(i) < 123) {
            return true;
        }
    }
    return false;
}

controllaNumeri = function (pw) {
    for (i = 0; i < pw.length; i++) {
        if (pw.charCodeAt(i) > 47 && pw.charCodeAt(i) < 58) {
            return true;
        }
    }
    return false;
}

controllaSpeciali = function (pw) {
    for (i = 0; i < pw.length; i++) {
        if ((pw.charCodeAt(i) > 31 && pw.charCodeAt(i) < 48) || (pw.charCodeAt(i) > 57 && pw.charCodeAt(i) < 65) || (pw.charCodeAt(i) > 90 && pw.charCodeAt(i) < 97) || (pw.charCodeAt(i) > 122)) {
            return true;
        }
    }
    return false;
}

cercaLettera = function (lett, carattere, tipo) {
    var indice = -1;
    for (ii = 0; ii < lett.length; ii++) {
        if (lett[ii][tipo] == carattere) {
            indice = ii;
        }
    }
    return indice;
}

consigliaModifiche = function (pw) {
    var risultato = '';
    var risultato0 = '';
    var risultato1 = '';
    var risultato2 = '';
    var risultato3 = '';


    var lunghezza = pw.length;

    /*
    console.log("---------------");
    
    console.log("Minuscole: "+numMinuscole+" - "+(perMinuscole*100).toFixed(2)+"%");
    console.log("Maiuscole: "+numMaiuscole+" - "+(perMaiuscole*100).toFixed(2)+"%");
    console.log("Numeri   : "+numNumeri+" - "+(perNumeri*100).toFixed(2)+"%");
    console.log("Speciali : "+numSpeciali+" - "+(perSpeciali*100).toFixed(2)+"%");
    */

    // se ci sono più di due della stessa caratterista seguenti passa il carattere alla prossima categoria

    lettere = [['a', 'A', '4', '@'],
    ['b', 'B', '5', '"'],
    ['c', 'C', '7', '('],
    ['d', 'D', '0', '.'],
    ['e', 'E', '3', '€'],
    ['f', 'F', '2', '£'],
    ['g', 'G', '9', '&'],
    ['h', 'H', '8', '#'],
    ['i', 'I', '1', '!'],
    ['j', 'J', '7', ']'],
    ['k', 'K', '2', '['],
    ['l', 'L', '9', ')'],
    ['m', 'M', '3', '+'],
    ['n', 'N', '2', '-'],
    ['o', 'O', '0', '*'],
    ['p', 'P', '6', '/'],
    ['q', 'Q', '9', '<'],
    ['r', 'R', '5', '>'],
    ['s', 'S', '8', '$'],
    ['t', 'T', '7', '!'],
    ['u', 'U', '0', '='],
    ['v', 'V', '4', ':'],
    ['w', 'W', '3', ';'],
    ['x', 'X', '8', '%'],
    ['y', 'Y', '1', '|'],
    ['z', 'Z', '2', '_']
    ];


    // Se la percentuale di ogni parte è maggiore al 25% e il 25% è > 1 carattere (almeno 4 caratteri)
    // allora cambia con la prima percentuale minore
    
    var risultato0 = pw;
    if ((risultato0.length * 0.25) > 1) {
        var i = 0;
        while ((perMinuscole(risultato0) < 0.25) && (i < risultato0.length)) {
            // aggiungi una minuscola alla prima che non è minuscola
            var car = risultato0[i];
            if (isMaiuscolo(car) || isNumero(car) || isSpeciale(car)) {
                var indice = cercaLettera(lettere, car, 1);
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 2);
                }
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 3);
                }
                if(indice==-1) {
                    indice = 0;
                }
                risultato0 = setCharAt(risultato0, i, lettere[indice][0]);
            }
            i+=4;
        }
    }
    
    
    // Se maiuscole mancano
    if ((risultato0.length * 0.25) > 1) {
        var i = 1;
        while ((perMaiuscole(risultato0) < 0.25) && (i < risultato0.length)) {
            // aggiungi una minuscola alla prima che non è minuscola
            var car = risultato0[i];
            if (isMinuscolo(car) || isNumero(car) || isSpeciale(car)) {
                var indice = cercaLettera(lettere, car, 0);
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 2);
                }
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 3);
                } 
                if(indice==-1) {
                    indice = 0;
                }
                risultato0 = setCharAt(risultato0, i, lettere[indice][1]);
            }
            i+=4;
        }
    }
    
    
    // Se numeri mancano
    if ((risultato0.length * 0.25) > 1) {
        var i = 2;
        while ((perNumeri(risultato0) < 0.25) && (i < risultato0.length )) {
            // aggiungi una minuscola alla prima che non è minuscola
            var car = risultato0[i];
            if (isMinuscolo(car) || isMaiuscolo(car) || isSpeciale(car)) {
                var indice = cercaLettera(lettere, car, 0);
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 1);
                }
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 3);
                }
                if(indice==-1) {
                    indice = 0;
                }
                risultato0 = setCharAt(risultato0, i, lettere[indice][2]);
            }
            i+=4;
        }
    }

    
    // se mancano gli speciali
    if ((risultato0.length * 0.25) > 1) {
        var i = 3;
        while ((perSpeciali(risultato0) < 0.25) && (i < risultato0.length )) {
            // aggiungi una minuscola alla prima che non è minuscola
            var car = risultato0[i];
            if (isMinuscolo(car) || isMaiuscolo(car) || isNumero(car)) {
                var indice = cercaLettera(lettere, car, 0);
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 1);
                }
                if(indice==-1) {
                    indice = cercaLettera(lettere, car, 2);
                }
                if(indice==-1) {
                    indice = 0;
                }
                risultato0 = setCharAt(risultato0, i, lettere[indice][3]);
            }
            i+=4;
        }
    }
    
    
    risultato3 = risultato0;

    console.log("-------------------");
    console.log("% Minuscole: " + perMinuscole(risultato3));
    console.log("% Maiuscole: " + perMaiuscole(risultato3));
    console.log("% Numeri   : " + perNumeri(risultato3));
    console.log("% Speciali : " + perSpeciali(risultato3));

    return risultato3;
}

isMinuscolo = function (car) {
    if (car.charCodeAt() > 96 && car.charCodeAt() < 123) {
        return true;
    } else {
        return false;
    }
}

isMaiuscolo = function (car) {
    if (car.charCodeAt() > 64 && car.charCodeAt() < 91) {
        return true;
    } else {
        return false;
    }
}

isNumero = function (car) {
    if (car.charCodeAt() > 47 && car.charCodeAt() < 58) {
        return true;
    } else {
        return false;
    }
}

isSpeciale = function (car) {
    if ((car.charCodeAt() > 31 && car.charCodeAt() < 48) || (car.charCodeAt() > 57 && car.charCodeAt() < 65) || (car.charCodeAt() > 90 && car.charCodeAt() < 97) || (car.charCodeAt() > 122)) {
        return true;
    } else {
        return false;
    }
}

perMinuscole = function (pw) {
    var lunghezza = pw.length;
    var num = 0;

    // calcola minuscole
    for (i = 0; i < pw.length; i++) {
        if (isMinuscolo(pw[i])) {
            num++;
        }
    }

    return (num / lunghezza).toFixed(2);
}

perMaiuscole = function (pw) {
    var lunghezza = pw.length;
    var num = 0;

    // calcola minuscole
    for (i = 0; i < pw.length; i++) {
        if (isMaiuscolo(pw[i])) {
            num++;
        }
    }

    return (num / lunghezza).toFixed(2);
}

perNumeri = function (pw) {
    var lunghezza = pw.length;
    var num = 0;

    // calcola minuscole
    for (i = 0; i < pw.length; i++) {
        if (isNumero(pw[i])) {
            num++;
        }
    }

    return (num / lunghezza).toFixed(2);
}

perSpeciali = function (pw) {
    var lunghezza = pw.length;
    var num = 0;

    // calcola minuscole
    for (i = 0; i < pw.length; i++) {
        if (isSpeciale(pw[i])) {
            num++;
        }
    }

    return (num / lunghezza).toFixed(2);
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}


/*
    // controlla se ci sono tre lettere minuscole continue e passa al maiuscolo
    var contatore = 0;
    for (i = 0; i < risultato0.length; i++) {
        var car = risultato0[i];
    
        if (car.charCodeAt() > 96 && car.charCodeAt() < 123) {
            contatore++;
        } else {
            // se c'è un altro tipo di carattere ricomincia il conteggio
            contatore = 0;
        }
        if (contatore > 2) {
            var indice = 0;
            indice = cercaLettera(lettere, car, 0);
            risultato += lettere[indice][1];
            contatore = 0;
        } else {
            risultato += car;
        }
    }
    
    // controlla se ci sono tre lettere maiuscole continue e passa ai numeri
    contatore = 0;
    for (i = 0; i < risultato.length; i++) {
        var car = risultato[i];
    
        if (car.charCodeAt() > 64 && car.charCodeAt() < 91) {
            contatore++;
        } else {
            // se c'è un altro tipo di carattere ricomincia il conteggio
            contatore = 0;
        }
        if (contatore > 2) {
            var indice = 0;
            indice = cercaLettera(lettere, car, 1);
            risultato1 += lettere[indice][2];
            contatore = 0;
        } else {
            risultato1 += car;
        }
    }
    
    // controlla se ci sono tre numeri continui e passa alle speciali
    contatore = 0;
    for (i = 0; i < risultato1.length; i++) {
        var car = risultato1[i];
    
        if (car.charCodeAt() > 47 && car.charCodeAt() < 58) {
            contatore++;
        } else {
            // se c'è un altro tipo di carattere ricomincia il conteggio
            contatore = 0;
        }
        if (contatore > 2) {
            var indice = 0;
            indice = cercaLettera(lettere, car, 2);
            risultato2 += lettere[indice][3];
            contatore = 0;
        } else {
            risultato2 += car;
        }
    }
    
    // controlla se ci sono tre speciali continui e passa alle minuscole
    contatore = 0;
    for (i = 0; i < risultato2.length; i++) {
        var car = risultato2[i];
    
        if ((car.charCodeAt() > 31 && car.charCodeAt() < 48) || (car.charCodeAt() > 57 && car.charCodeAt() < 65) || (car.charCodeAt() > 90 && car.charCodeAt() < 97) || (car.charCodeAt() > 122)) {
            contatore++;
        } else {
            // se c'è un altro tipo di carattere ricomincia il conteggio
            contatore = 0;
        }
        if (contatore > 2) {
            var indice = 0;
            indice = cercaLettera(lettere, car, 3);
            risultato3 += lettere[indice][0];
            contatore = 0;
        } else {
            risultato3 += car;
        }
    }
    */