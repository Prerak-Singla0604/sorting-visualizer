let array = [];
        let arrayBars = [];
        let sorting = false;

        function generateArray() {
            if (sorting) return;
            sorting = true;
            array = [];
            arrayBars = [];
            for (let i = 0; i < 20; i++) {
                array.push(Math.floor(Math.random() * 100) + 1);
            }
            renderArray();
            sorting = false;
        }

        function renderArray() {
            const arrayContainer = document.getElementById("array");
            arrayContainer.innerHTML = "";
            arrayBars = [];
            for (let i = 0; i < array.length; i++) {
                const arrayBar = document.createElement("div");
                arrayBar.className = "array-bar";
                arrayBar.style.height = `${array[i]}px`;
                arrayContainer.appendChild(arrayBar);
                arrayBars.push(arrayBar);
            }
        }

        async function insertionSort() {
            if (sorting) return;
            sorting = true;
            disableButtons();
            for (let i = 1; i < array.length; i++) {
                let key = array[i];
                let j = i - 1;
                while (j >= 0 && array[j] > key) {
                    array[j + 1] = array[j];
                    j--;
                }
                array[j + 1] = key;
                updateArrayBars();
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            sorting = false;
            enableButtons();
        }

        async function bubbleSort() {
            if (sorting) return;
            sorting = true;
            disableButtons();
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    if (array[j] > array[j + 1]) {
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                    updateArrayBars();
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            sorting = false;
            enableButtons();
        }

        async function selectionSort() {
            if (sorting) return;
            sorting = true;
            disableButtons();
            for (let i = 0; i < array.length - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
                }
                let temp = array[minIndex];
                array[minIndex] = array[i];
                array[i] = temp;
                updateArrayBars();
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            sorting = false;
            enableButtons();
        }

        function updateArrayBars() {
            for (let i = 0; i < array.length; i++) {
                arrayBars[i].style.height = `${array[i]}px`;
            }
        }

        function disableButtons() {
            document.getElementById("generate-array").disabled = true;
            document.getElementById("insertion-sort").disabled = true;
            document.getElementById("bubble-sort").disabled = true;
            document.getElementById("selection-sort").disabled = true;
        }

        function enableButtons() {
            document.getElementById("generate-array").disabled = false;
            document.getElementById("insertion-sort").disabled = false;
            document.getElementById("bubble-sort").disabled = false;
            document.getElementById("selection-sort").disabled = false;
        }

        document.getElementById("generate-array").addEventListener("click", generateArray);
        document.getElementById("insertion-sort").addEventListener("click", insertionSort);
        document.getElementById("bubble-sort").addEventListener("click", bubbleSort);
        document.getElementById("selection-sort").addEventListener("click", selectionSort);

        generateArray();
