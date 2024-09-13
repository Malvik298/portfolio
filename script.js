document.addEventListener("DOMContentLoaded", (event) => {
    
}); 


// Function to show and hide the window
document.addEventListener("DOMContentLoaded", (event) => {
    const appBarLinks = document.querySelectorAll('#appbar a');
    const windowTemplate = document.getElementById('windowTemplate');
    const modalContainer = document.body; // Or any suitable container
    const openWindows = []; // Track open windows

    appBarLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-bs-target').replace('#', '');

            try {
                jsonData = JSON.parse(info);
                // console.log(jsonData)
                const sectionData = jsonData[sectionId];
                console.log("Content for " + sectionId)

                if (sectionData) {
                    const newWindow = createWindow(sectionData);
                    modalContainer.appendChild(newWindow);
                    openWindows.push(newWindow);
                    manageZIndex();

                    newWindow.style.display = 'block'; // Show the window

                    // Make the new window draggable and resizable
                    dragElement(newWindow, newWindow.querySelector('.window-header'));
                    makeResizable(newWindow.querySelector('.window-body'));

                    // Add event listener to close button
                    newWindow.querySelector('.close-button').addEventListener('click', () => {
                        newWindow.remove();
                        openWindows.splice(openWindows.indexOf(newWindow), 1);
                        manageZIndex();
                    });

                    // Add event listeners for minimize and maximize buttons (implement their logic as needed)
                    // ...
                } else {
                    console.error(`Data for section '${sectionId}' not found.`);
                }
            } catch (error) {
                console.error('Error fetching or parsing JSON data:', error);
            }
        });
    });


    function createWindow(data) {
        const windowClone = windowTemplate.cloneNode(true);
        windowClone.id = `${data.title.replace(/\s+/g, '')}Window`;
        windowClone.querySelector('.window-title').textContent = data.title;

        const tabsContainer = windowClone.querySelector('#v-pills-tab');
        const contentContainer = windowClone.querySelector('#v-pills-tabContent');
        let firstTab = true;
        // Create tabs and content dynamically based on your data structure
        for (const [tabId, tabContent] of Object.entries(data.content)) {
            const tab = createTab(tabId, tabContent.title);
            const contentPane = createContentPane(tabId, tabContent.text); // Add your logic to get the content text
            tabsContainer.appendChild(tab);
            contentContainer.appendChild(contentPane);
            firstTab = false;
        }

        return windowClone;
    }

    function createTab(id, title, firstTab) {
        const tab = document.createElement('button');
        tab.classList.add('nav-link');
        tab.classList.add('nav-link');
    if (firstTab) {
        tab.classList.add('active');
    }
        tab.setAttribute('id', `v-pills-${id}-tab`);
        tab.setAttribute('data-bs-toggle', 'pill');
        tab.setAttribute('data-bs-target', `#v-pills-${id}`);
        tab.setAttribute('type', 'button');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', `v-pills-${id}`);
        tab.setAttribute('aria-selected', 'true');
        tab.innerHTML = title;
        return tab;
    }

    function createContentPane(id, text,firstTab) {
        const pane = document.createElement('div');
        pane.classList.add('tab-pane', 'fade');
        if (firstTab) {
            pane.classList.add('show', 'active');
        }
        pane.setAttribute('id', `v-pills-${id}`);
        pane.setAttribute('role', 'tabpanel');
        pane.setAttribute('aria-labelledby', `v-pills-${id}-tab`);
        pane.innerHTML = text;
        return pane;
    }


    function manageZIndex() {
        let zIndex = 1050; 
        openWindows.forEach(window => {
            window.style.zIndex = zIndex;
            zIndex++;
        });
    }
   

    function dragElement(element, dragHandle) {
        let offsetX, offsetY;
        let isDragging = false;

        dragHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent text selection

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            element.style.left = x + 'px';
            element.style.top = y + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;   

            element.style.cursor = 'default';
        });
    }

    // 123
    function makeResizable(element) {
        let isResizing = false;
        let resizeDirection = ''; // 'e', 's', 'se'
        let startX, startY, startWidth, startHeight;
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle');
        element.appendChild(resizeHandle);

        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;

            const rect = element.getBoundingClientRect();

            // Determine resize direction based on mouse position
            if (e.clientY > rect.bottom - 10 && e.clientX > rect.right - 10) {
                resizeDirection = 'se'; // Bottom-Right
            } else if (e.clientY > rect.bottom - 10) {
                resizeDirection = 's'; // Bottom
            } else if (e.clientX > rect.right - 10) {
                resizeDirection = 'e'; // Right
            }
            e.preventDefault()
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            e.preventDefault();

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (resizeDirection === 'se') {
                element.style.width = startWidth + deltaX + 'px';
                element.style.height = startHeight + deltaY + 'px';
            } else if (resizeDirection === 's') {
                element.style.height = startHeight + deltaY + 'px';
            } else if (resizeDirection === 'e') {
                element.style.width = startWidth + deltaX + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
            resizeDirection = '';
        });
    }
});


// Get current time
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    document.getElementById('time').textContent = time;
}
updateTime();
setInterval(updateTime, 1000);

function downloadResume(){
    const link = document.createElement('a');
      link.href = "Resume.pdf"; 
      // Set the download attribute to the desired file name
      link.download = "Malvik_Resume.pdf";
      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}