let array = [];
        let arrayBars = [];
        let speed = 100;

        document.getElementById("speed").addEventListener("input", function() {
            speed = this.value;
        });

        function generateArray() {
            array = [];
            arrayBars = [];
            for (let i = 0; i < 20; i++) {
                array.push(Math.floor(Math.random() * 100) + 1);
            }
            renderArray();
        }

        function renderArray() {
            const arrayContainer = document.getElementById("array");
            arrayContainer.innerHTML = "";
            arrayBars = array.map(value => {
                const arrayBar = document.createElement("div");
                arrayBar.className = "array-bar";
                arrayBar.style.height = `${value * 3}px`; 
                arrayContainer.appendChild(arrayBar);
                return arrayBar;
            });
        }

        function updateArray() {
            for (let i = 0; i < array.length; i++) {
                arrayBars[i].style.height = `${array[i] * 3}px`; 
            }
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function bubbleSort() {
            let len = array.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - i - 1; j++) {
                    arrayBars[j].classList.add("comparing");
                    arrayBars[j + 1].classList.add("comparing");
                    await sleep(speed);

                    if (array[j] > array[j + 1]) {
                        arrayBars[j].classList.add("swapping");
                        arrayBars[j + 1].classList.add("swapping");
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        updateArray();
                        await sleep(speed);
                        arrayBars[j].classList.remove("swapping");
                        arrayBars[j + 1].classList.remove("swapping");
                    }

                    arrayBars[j].classList.remove("comparing");
                    arrayBars[j + 1].classList.remove("comparing");
                }
            }
        }

        async function insertionSort() {
            let len = array.length;
            for (let i = 1; i < len; i++) {
                let key = array[i];
                let j = i - 1;
                while (j >= 0 && array[j] > key) {
                    arrayBars[j + 1].classList.add("comparing");
                    arrayBars[j].classList.add("comparing");
                    await sleep(speed);

                    array[j + 1] = array[j];
                    arrayBars[j + 1].style.height = `${array[j + 1] * 3}px`;
                    await sleep(speed);

                    arrayBars[j + 1].classList.remove("comparing");
                    arrayBars[j].classList.remove("comparing");
                    j--;
                }
                array[j + 1] = key;
                updateArray();
            }
        }

        async function selectionSort() {
            let len = array.length;
            for (let i = 0; i < len - 1; i++) {
                let minIdx = i;
                for (let j = i + 1; j < len; j++) {
                    arrayBars[minIdx].classList.add("comparing");
                    arrayBars[j].classList.add("comparing");
                    await sleep(speed);

                    if (array[j] < array[minIdx]) {
                        minIdx = j;
                    }

                    arrayBars[minIdx].classList.remove("comparing");
                    arrayBars[j].classList.remove("comparing");
                }
                if (minIdx != i) {
                    arrayBars[i].classList.add("swapping");
                    arrayBars[minIdx].classList.add("swapping");
                    [array[i], array[minIdx]] = [array[minIdx], array[i]];
                    updateArray();
                    await sleep(speed);
                    arrayBars[i].classList.remove("swapping");
                    arrayBars[minIdx].classList.remove("swapping");
                }
            }
        }

        document.getElementById("generate-array").addEventListener("click", generateArray);
        document.getElementById("bubble-sort").addEventListener("click", bubbleSort);
        document.getElementById("insertion-sort").addEventListener("click", insertionSort);
        document.getElementById("selection-sort").addEventListener("click", selectionSort);

        generateArray();
