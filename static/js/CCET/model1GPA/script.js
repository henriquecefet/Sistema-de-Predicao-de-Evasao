new Vue({
    el: '#app',
    data: {
        formData: {
            ingresso_atual: '',
            matricula: '',
            SEXO: '',
            IsTheyBusinessperson: '',
            Categoria: '',
            GPA1: '',
            GPA2: '',
            GPA3: '',
            GPA4: '',
            grade_programming1: '',
            grade_programming2: '',
            grade_basic_math: '',
            grade_calculus1: '',
            grade_linear_algebra: '',
            employee_student: '',
            NOME_CURSO: '',
            CR_ATUAL: '',
            bolsista: ''
        },
        prediction: "<p>Faça uma predição</p>"
    },
    methods: {
        replaceComma(field) {
            this.formData[field] = this.formData[field].replace(',', '.');
          },
        submitForm() {
            if(IsTheyBusinessperson.value === "Nonentrepreneur"){
                if(Categoria.value != "Não é empresário"){
                    alert("Preencha com coerência IsTheyBusinessperson e Categoria");
                    return;
                }
            }
            if(Categoria.value === "Não é empresário"){
                if(IsTheyBusinessperson.value != "Nonentrepreneur"){
                    alert("Preencha com coerência IsTheyBusinessperson e Categoria");
                    return;
                }
            }
            fetch('http://127.0.0.1:5000/ccet/model1GPA/predict', { // Use o endereço correto da sua API aqui
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.prediction === 1) {
                    console.log("Provavelmente vai se formar");
                    this.prediction = `<p style="color: green;">Provavelmente vai se formar</p>`;
                } else if (data.prediction === 0) {
                    console.log("Provavelmente vai evadir");
                    this.prediction = `<p style="color: red;">Provavelmente vai evadir</p>`;
                } else {
                    this.prediction = `<p>Unexpected response from server</p>`;
                    console.log("Unexpected response from server"); 

                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Algo deu errado");
            });
        }
    }
});

