document.addEventListener("DOMContentLoaded", (event) => {
    
}); 

//const data = '{"experience": {"title": "Work Experience","content": {"tab1": { "title": "Tab 1 title", "text": "Content for Tab 1" },"tab2": { "title": "Tab 2 title", "text": "Content for Tab 2" }}},"volunteers": {"title": "Volunteer Experience", "content": "<p>Here is my volunteer experience...</p>"},"certification": { "title": "Certifications",  "content": "<p>Here are my certifications...</p>"}}'
const data = '{"experience":{"title":"Work Experience","content":{"Tab1":{"title":"Application Security Analyst","text":"Adani Groups, Ahmedabad, Gujarat | Sep 2022 - Mar 2023- Identified potential threats in the application architecture and proposed solutions to mitigate risks.- Collaborated with development teams to implement security fixes.- Worked on incident response and forensics investigations.- Conducted regular security assessments and vulnerability scans.- Provided training and awareness sessions to development teams.- Monitored security tools and systems to detect and respond to incidents.- Assisted in developing security policies and procedures.- Analyzed security breaches to identify root causes and recommended corrective actions."},"Tab2":{"title":"Vulnerability Assessment and Penetration Tester","text":"TechDefence Labs Pvt. Ltd., Ahmedabad, Gujarat | Aug 2022 - Jul 2023- Performed vulnerability assessments on various networks, systems, and applications.- Documented findings in detailed report format.- Provided recommendations for remediation and risk mitigation.- Conducted penetration testing to identify security weaknesses.- Assisted clients in implementing security controls and measures.- Presented assessment findings to clients and stakeholders.- Conducted security audits and compliance assessments.- Developed and maintained security testing methodologies."},"Tab3":{"title":"Security Analyst Intern","text":"TechDefence Labs Pvt. Ltd., Ahmedabad, Gujarat | Aug 2022 - Jul 2023- Worked on multiple VAPT assessments including web, mobile, infrastructure and thick client applications.Identified, analysed vulnerabilities and provided solutions to problems.- Created plans and communicated deadlines to complete projects on time- Wrote custom burp extensions according to the assessment needs -Managed Client interactions throughout the project. "}}},"skills":{"title":"Skills","content":{"Tab1":{"title":"Skills","text":"BurpSuite, Nessus, Nmap, Wireshark, Java, Python, Linux, Bash, PowerShell, Metasploit, SQL, Web Application Security, Network Security, Penetration Testing, Vulnerability Assessment, Security Auditing, Incident Response, Forensics"}}},"aboutMe":{"title":"Details","content":{"Tab1":{"title":"Contact","text":"<b> LinkedIn | Github </b>"}}},"education":{"title":"Education","content":{"Tab1":{"title":"Master of Engineering in Information Systems Security","text":"Concordia University, Montreal, Quebec | Jan 2023 - Present"},"Tab2":{"title":"Bachelor of Engineering","text":"Silver Oak College of Engineering and Technology, Gujarat Technological University, Ahmedabad, Gujarat | Aug 2017 - Jun 2021"}}},"certifications":{"title":"certifications","content":{"Tab1":{"title":"Certified In CyberSecurity by ISC2","text":"ID: 1122911"},"Tab2":{"title":"Red Hat Certified Engineer certification","text":"ID: 190-339-002"},"Tab3":{"title":"Red Hat Certified System Administrator certification","text":"ID: 190-339-002"},"Tab4":{"title":"Google Cloud Certified Associate Cloud Engineer,","text":"ID: MpiZZ8"}}},"projects":{"title":"Projects","content":{"Tab1":{"title":"Silver Oak Edge","text":" It\'s a quiz app for institutes that uses multiple-choice questions to help students study their academics. I worked on the UI/UX and deployment to power up this App while my colleagues worked on the programming and API. This app helped to enrich the learning of more than 1500 students"},"Tab2":{"title":"Department App","text":"It\'s an LMS system for departments to improve better connectivity between students and faculties. This was focused to digitalize the day-to-day communications and results shared between management and students. This  application was planned to simplify the daily task of more than 1000 students."},"Tab3":{"title":"Pentest Automation","text":"An API based pentest automation tool in the making use of multiple tools such as Nmap, dnsdumpster, sqlmap, dalfonXSS, etc in backend to perform the required enumeration task and exploitation."},"Tab4":{"title":"Automatic Report Generator ","text":"A python-based tool which helps in generating VA and PT reports after the assessments have been completed. A completely flexible tool which takes the help of Jinja Templates to create user-defined reports"}}},"talks":{"title":"Talks","content":{"Tab1":{"title":"Mobile App Development for Android","text":"5 Days workshop on basic of Android App Development"},"Tab2":{"title":"Deserialization 101","text":" A talk on Deserialization vulnerability in OWASP Ahmedabad Chapter - June 2023"}}},"volunteers":{"title":"Volunteer","content":{"Tab1":{"title":"CTF Designer - AtHackCTF - Concordia University","text":"Developed a web based CTF which utilized weakness in JWT , misconfiguration in application and Linux systems, SSRF, buffer overflow bypassing ASLR, NX, and PIE, misconfigured user permission, wrapping in docker containers."},"Tab2":{"title":"Professional Speaker - OWASP Ahmedabad","text":"This talk was focused on how a Deserialization vulnerability exists, the working mechanism behind it, root cause, searching for vulnerability and exploitation"},"Tab3":{"title":"Student Ambassador - RedHat Academy","text":"Gained experience in public speaking through leading workshops and presentations for new students.Conducted new student orientations to facilitate retention and foster positive attitude towards attending university."},"Tab4":{"title":"Advisory Board Member - IEEE SilverOak University","text":"Analyzed data to identify areas of improvement in corporate governance policies and procedures. Provided guidance on ethical decision-making processes throughout the organization."},"Tab5":{"title":"Technical Lead - IEEE SilverOak University","text":"Guided team through technical obstacles with expertise of system details.Investigated software issues by troubleshooting and analyzing systems. Provided technical guidance to team members on product design decisions, coding practices, testing methodologies, and debugging procedures. Prepared reports and correspondence concerned project specifications, activities and status."}}}}'

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
                jsonData = JSON.parse(data)
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
      link.href = "resume.pdf"; 
      // Set the download attribute to the desired file name
      link.download = "Malvik_Resume.pdf";
      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}