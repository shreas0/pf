export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' }
];

export const profile = {
  name: 'Shreshtha Sharma',
  nickname: 'Siri',
  title: 'Computer Science Student | AI/ML and Frontend Enthusiast',
  location: 'Lucknow, India',
  tagline: 'Passionate about building interactive experiences and exploring the world of AI/ML and Frontend Development.',
  about: ["I’m a passionate and curious tech enthusiast who loves turning ideas into real, interactive experiences. My journey into development started with a simple interest in how websites work, and over time, it has grown into a strong passion for building modern, user-friendly applications. I enjoy working with technologies like React.js, JavaScript, and Python, and I’m constantly exploring new tools to improve both my skills and the quality of what I create.",
    "What excites me the most is the process of building something from scratch starting with an idea, designing it, and then bringing it to life through code. I like creating projects that are not only functional but also visually engaging and meaningful for users. Whether it’s a dynamic web app or a creative interface, I focus on writing clean, efficient code and delivering smooth user experiences.",
    "I’m someone who believes in continuous learning and self-improvement. I regularly work on personal projects, experiment with new ideas, and challenge myself to step outside my comfort zone. I’m adaptable, detail-oriented, and always ready to learn something new.",
    "One of my strengths is my ability to stay deeply focused on a task, ensuring high-quality results without distractions. A challenge I’m working on is that I sometimes find it difficult to say no, as I like to help others whenever I can."
  ],
  hobbies: ['Music', 'Casual Gaming', 'Creative Experimentation', 'Skill Building']
};

export const skillGroups = [
  {
    category: 'Web Development',
    items: [
      {
        name: 'HTML',
        level: 75,
        summary: 'Clean semantic structure and accessible markup that stays maintainable as projects grow.'
      },
      {
        name: 'CSS',
        level: 78,
        summary: 'Responsive layouts, animation, and polished interfaces that remain stable across breakpoints.'
      },
      {
        name: 'JavaScript',
        level: 82,
        summary: 'Frontend interaction and backend logic with performance-aware async workflows.'
      },
      {
        name: 'React.js',
        level: 88,
        summary: 'Component-based UI development with reusable patterns, routing, and state-driven rendering.'
      },
      {
        name: 'Node.js',
        level: 75,
        summary: 'Server-side JavaScript runtime for building scalable backend services and APIs.'
      },
      {
        name: 'Express.js',
        level: 70,
        summary: 'Fast, unopinionated routing and middleware web framework for Node.js.'
      }
    ]
  },
  {
    category: 'Programming and Core',
    items: [
      {
        name: 'Python',
        level: 80,
        summary: 'Logic building, automation, and backend-friendly scripting with readable, structured code.'
      },
      {
        name: 'C++',
        level: 85,
        summary: 'Strong DSA and performance-focused problem solving with practical STL usage.'
      },
      {
        name: 'Java',
        level: 72,
        summary: 'Object-oriented design with reliable architecture and maintainable structure.'
      },
      {
        name: 'C',
        level: 70,
        summary: 'Low-level understanding of memory behavior, pointers, and systems fundamentals.'
      }
    ]
  },
  {
    category: 'Data Handling',
    items: [
      {
        name: 'Pandas',
        level: 80,
        summary: 'Data manipulation and analysis library for structuring and cleaning data.'
      },
      {
        name: 'Matplotlib',
        level: 75,
        summary: 'Creating static, animated, and interactive data visualizations in Python.'
      },
      {
        name: 'Seaborn',
        level: 75,
        summary: 'High-level interface for drawing attractive and informative statistical graphics.'
      },
      {
        name: 'Power BI',
        level: 70,
        summary: 'Business analytics tool to analyze data and share interactive insights.'
      },
      {
        name: 'Microsoft Excel',
        level: 85,
        summary: 'Advanced spreadsheet management, data analysis, modeling, and reporting.'
      }
    ]
  },
  {
    category: 'UI and Motion',
    items: [
      {
        name: 'Figma',
        level: 76,
        summary: 'From wireframes to polished screens with practical handoff-ready layout decisions.'
      },
      {
        name: 'Photoshop',
        level: 84,
        summary: 'Compositing and visual editing for thumbnails, assets, and production-ready graphics.'
      },
      {
        name: 'Premiere Pro',
        level: 85,
        summary: 'Cutting, pacing, transitions, and audio sync for smooth and engaging videos.'
      },
      {
        name: 'After Effects',
        level: 86,
        summary: 'Motion graphics and animation with strong timing and visual rhythm.'
      }
    ]
  },
  {
    category: 'Tools and Workflow',
    items: [
      {
        name: 'GitHub',
        level: 90,
        summary: 'Version control workflows with branches, commits, and conflict handling.'
      },
      {
        name: 'VS Code',
        level: 96,
        summary: 'Primary coding environment with extension-driven productivity and debugging.'
      },
      {
        name: 'Browser DevTools',
        level: 95,
        summary: 'Layout debugging, performance checks, and rapid responsive fixes in real time.'
      }
    ]
  }
];

export const projects = [
  {
    name: 'Attendance Management System',
    stack: 'React, JavaScript, CSS',
    description: 'A full-stack Attendance Management System using React.js with role-based access for teachers and students.',
    url: 'https://shreas0.github.io/attendance-system/',
    videoUrl: process.env.PUBLIC_URL + '/attendance-demo.mp4'
  },
  {
    name: 'Recipe Finder Web Application',
    stack: 'React, REST API, JavaScript',
    description: 'A full-stack recipe search app using React.js and a public food API enabling users to search and filter recipes.',
    url: 'https://shreas0.github.io/recipe-finder/',
    videoUrl: process.env.PUBLIC_URL + '/recipe-demo.mp4'
  },
  {
    name: 'Simple Chatbot',
    stack: 'Python, Streamlit',
    description: 'A simple chatbot application built using Python and Streamlit.',
    url: 'https://simplechatbotbysiri.streamlit.app/',
    videoUrl: process.env.PUBLIC_URL + '/chatbot-demo.mp4'
  },
  {
    name: "Face Unlock",
    stack: "Python, Numpy, Pickle, C++, pywin32, Keyring",
    description: "Native C++/Python face-unlock for the Windows 11 lock screen, using ArcFace recognition and blink-liveness detection.",
    url: "https://github.com/shreas0/face-unlock-for-windows.git",
    videoUrl: process.env.PUBLIC_URL + '/face-unlock-for-windows-demo.mp4'
  }
];

export const contactLinks = [
  { label: 'Email', value: 'shreshtha2sh@gmail.com', href: 'mailto:shreshtha2sh@gmail.com' },
  { label: 'GitHub', value: 'github.com/shreas0', href: 'https://github.com/shreas0' },
  { label: 'LinkedIn', value: 'www.linkedin.com/in/shreshtha-sharma-siri', href: 'https://www.linkedin.com/in/shreshtha-sharma-siri' }
];
