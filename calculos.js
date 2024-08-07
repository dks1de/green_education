function openCalculation(type) {
            document.getElementById('overlay').style.display = 'block';
            var container = document.getElementById('calculation-container');
            container.style.display = 'block';
            container.innerHTML = '<span class="close" onclick="closeCalculation()">×</span>'; // Reset content

            if (type === 'transport') {
                // Conteúdo para cálculo de emissão por transporte
                container.innerHTML += `
                    <h2>Emissão por Transporte</h2>
                    <p>Calculadora para estimar a emissão de carbono com base no meio de transporte utilizado e na distância percorrida.</p>
                    <label for="transporte">Escolha o meio de transporte:</label>
                    <select id="transporte">
                        <option value="automovel">Automóvel</option>
                        <option value="motocicleta">Motocicleta</option>
                        <option value="transporte_publico">Transporte Público</option>
                    </select><br><br>
                    <label for="distancia">Distância em quilômetros:</label>
                    <input type="text" id="distancia"><br><br>
                    <input type="checkbox" id="ida_volta">
                    <label for="ida_volta">É ida e volta?</label><br><br>
                    <button onclick="calcularEmissaoTransporte()">Calcular</button>
                    <p id="resultadoTransporte"></p>
                `;
            } else if (type === 'energy') {
                // Conteúdo para cálculo de emissão por energia
                container.innerHTML += `
                    <h2>Emissão por Energia</h2>
                    <p>Calculadora para determinar a emissão de carbono com base no consumo de energia em KWh.</p>
                    <label for="energia">Insira o consumo de energia em KWh:</label>
                    <input type="text" id="energia"><br><br>
                    <button onclick="calcularEmissaoEnergia()">Calcular</button>
                    <p id="resultadoEnergia"></p>
                `;
            } else if (type === 'airTravel') {
                // Conteúdo para cálculo de emissão por viagens aéreas
                container.innerHTML += `
                    <h2>Emissão por Viagens Aéreas</h2>
                    <p>Calculadora para estimar a emissão de carbono de viagens aéreas com base na distância percorrida.</p>
                    <label for="distanciaAerea">Insira a distância percorrida em Km:</label>
                    <input type="text" id="distanciaAerea"><br><br>
                    <button onclick="calcularEmissaoAerea()">Calcular</button>
                    <p id="resultadoAerea"></p>
                `;
            } else if (type === 'refrigerantGas') {
                // Conteúdo para cálculo de emissão por gases refrigerantes
                container.innerHTML += `
                    <h2>Emissão por Gases Refrigerantes</h2>
                    <p>Calculadora para determinar a emissão de carbono com base na quantidade de gás refrigerante que escapou durante uma manutenção.</p>
                    <label for="gas">Escolha o tipo de gás:</label>
                    <select id="gas">
                        <option value="R-454A">R-454 A</option>
                        <option value="HFC-32">HFC -32 ou R32</option>
                        <option value="R-452">R- 452</option>
                        <option value="HFC-134a">HFC-134 a</option>
                        <option value="R-407C">R-407 C</option>
                        <option value="R-410A">R 410 A</option>
                        <option value="R-404A">R 404 A</option>
                    </select><br><br>
                    <label for="quantidadeGas">Insira a quantidade de gás em Kg:</label>
                    <input type="text" id="quantidadeGas"><br><br>
                    <button onclick="calcularEmissaoGas()">Calcular</button>
                    <p id="resultadoGas"></p>
                `;
            } else if (type === 'water') {
                // Conteúdo para cálculo de emissão por consumo de água
                container.innerHTML += `
                    <h2>Emissão por Consumo de Água</h2>
                    <p>Calculadora para estimar a emissão de carbono com base no consumo de água.</p>
                    <label for="consumoAgua">Insira o consumo de água em m³:</label>
                    <input type="text" id="consumoAgua"><br><br>
                    <button onclick="calcularEmissaoAgua()">Calcular</button>
                    <p id="resultadoAgua"></p>
                `;
            } else if (type === 'residues') {
                // Conteúdo para cálculo de emissão por resíduos sólidos
                container.innerHTML += `
                    <h2>Emissão por Resíduos Sólidos</h2>
                    <p>Calculadora para calcular a emissão de carbono com base na quantidade de resíduos sólidos.</p>
                    <label for="residuosSolidos">Insira a quantidade de resíduos sólidos em Kg:</label>
                    <input type="text" id="residuosSolidos"><br><br>
                    <button onclick="calcularEmissaoResiduos()">Calcular</button>
                    <p id="resultadoResiduos"></p>
                `;
            }
        }

        function calcularEmissaoTransporte() {
            var transporte = document.getElementById('transporte').value;
            var distancia = parseFloat(document.getElementById('distancia').value);
            var idaVolta = document.getElementById('ida_volta').checked ? 2 : 1;
            var emissoes = {
                'automovel': 0.000148,
                'motocicleta': 0.0000448,
                'transporte_publico': 0.0000566
            };
            var emissao = emissoes[transporte] * distancia * idaVolta;
                        document.getElementById('resultadoTransporte').innerText = "Emissão de carbono: " + (emissao * 1000).toFixed(2) + " kg";
        }

        function calcularEmissaoEnergia() {
            var energia = parseFloat(document.getElementById('energia').value);
            var fatorEmissao = 0.0426; // Este é um valor hipotético para o exemplo
            var emissao = (energia * fatorEmissao) / 100;
            document.getElementById('resultadoEnergia').innerText = "Emissão de carbono: " + emissao.toFixed(2) + " Toneladas";
        }

        function calcularEmissaoAerea() {
            var distancia = parseFloat(document.getElementById('distanciaAerea').value);
            var fatorEmissao = distancia <= 500 ? 0.00012988 : distancia <= 3700 ? 0.00008107 : 0.00010195;
            var emissao = distancia * fatorEmissao;
            document.getElementById('resultadoAerea').innerText = "Emissão de carbono: " + (emissao * 1000).toFixed(6) + " kg";
        }

        function calcularEmissaoGas() {
            var gas = document.getElementById('gas').value;
            var quantidade = parseFloat(document.getElementById('quantidadeGas').value);
            var fatoresEmissao = {
                'R-454A': 237,
                'HFC-32': 677,
                'R-452': 675,
                'HFC-134a': 1300,
                'R-407C': 1624,
                'R-410A': 1924,
                'R-404A': 3943
            };
            var emissao = (quantidade * fatoresEmissao[gas]) / 1000;
            document.getElementById('resultadoGas').innerText = "Emissão de carbono: " + emissao.toFixed(3) + " kg";
        }

        function calcularEmissaoAgua() {
            var consumoAgua = parseFloat(document.getElementById('consumoAgua').value);
            var fatorEmissao = 0.0003; // Este é um valor hipotético para o exemplo
            var emissao = consumoAgua * fatorEmissao;
            document.getElementById('resultadoAgua').innerText = "Emissão de carbono: " + emissao.toFixed(2) + " kg";
        }

        function calcularEmissaoResiduos() {
            var residuosSolidos = parseFloat(document.getElementById('residuosSolidos').value);
            var fatorEmissao = 0.001; // Este é um valor hipotético para o exemplo
            var emissao = residuosSolidos * fatorEmissao;
            document.getElementById('resultadoResiduos').innerText = "Emissão de carbono: " + emissao.toFixed(2) + " kg";
        }

        function closeCalculation() {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('calculation-container').style.display = 'none';
        }