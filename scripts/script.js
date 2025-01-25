// Set the current year and last modified date
let d = new Date();
document.getElementById("currentYear").innerHTML = `&copy; ${d.getFullYear()}`;
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;



document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navigation ul li a');
    const courseList = document.querySelector('#courses-list');
    const certificateList = document.querySelector('#courseList');
    const hamburger = document.querySelector('#menu');
    const nav = document.querySelector('.navigation');
    const bottonComp = document.querySelector('#botton-Comp');
    const bottonWeb = document.querySelector('#botton-Web');
    const allButtons = document.querySelector('#all-Buttons');
    const totalCredit = document.querySelector('#total-credit');
    const titleTotalCredit = 'The total number of credits required = ';

    // Courselist Array
    const courseswork = [ 
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }   
    ];

    function displayCourses(coursesToDisplay, targetList) {
        targetList.innerHTML = ''; 

        if (coursesToDisplay.length === 0) {
            targetList.innerHTML = "<p>No courses found.</p>";
            return;
        }

        const courseHTML = coursesToDisplay.map(course => {
            const listItemClass = course.completed ? 'completed' : '';
            if (targetList === certificateList) {
                return `<li class="${listItemClass}"><strong>${course.subject} ${course.number}</strong><p>${course.description}</p></li>`;
            } else {
                return `<li>
                <p>${course.subject} ${course.number} - ${course.title}</p>
                <ul>
                <li><p>${course.technology}</p></li>
                </ul>
                </li>`;
            }
        }).join('');
        targetList.innerHTML = courseHTML;
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

 

    // Initial display of courses and certificates
    displayCourses(courseswork, courseList);
    displayCourses(courseswork, certificateList);

    // Filter Button Event Listeners
    bottonComp.addEventListener('click', () => {
        const filteredCourses = courseswork.filter(course => course.subject === 'CSE');
        totalCredit.textContent = titleTotalCredit + filteredCourses.reduce((total, course) => total + course.credits, 0);
        displayCourses(filteredCourses, certificateList);
    });

    bottonWeb.addEventListener('click', () => {
        const filteredCourses = courseswork.filter(course => course.subject === 'WDD');
        totalCredit.textContent = titleTotalCredit + filteredCourses.reduce((total, course) => total + course.credits, 0);
        displayCourses(filteredCourses, certificateList);
    });

    allButtons.addEventListener('click', () => {
        totalCredit.textContent = titleTotalCredit + courseswork.reduce((total, course) => total + course.credits, 0);
        displayCourses(courseswork, certificateList);
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('show');
        hamburger.classList.toggle('show');
    });

    const courseCompletedStyle = document.createElement('style');
    courseCompletedStyle.innerHTML = `
        #courseList li {
            padding: 5px;
            margin: 5px 0;
            border: 1px solid black;
             list-style: none;
                                  }
        #courseList li.completed {
            background-color:rgb(18, 205, 99);
            color: #FFF;
        }
    `;
    document.head.appendChild(courseCompletedStyle);
});
