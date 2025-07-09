
    function generateSingleMockCourse(id) {
      const categories = {
        "Web Development": {
          tags: ["html", "css", "javascript", "php", "backend", "frontend"],
          base: [
            {
              title: "Getting Started",
              subsections: ["What is Web Development?", "Tools You Need", "Intro to HTML"]
            },
            {
              title: "Frontend Essentials",
              subsections: ["HTML5 Basics", "CSS Layouts", "JavaScript DOM"]
            },
            {
              title: "Backend Basics",
              subsections: ["What is a Server?", "Intro to PHP", "Connecting to a DB"]
            }
          ]
        },
        "Design": {
          tags: ["ui", "ux", "figma", "wireframe", "prototyping"],
          base: [
            {
              title: "Design Thinking",
              subsections: ["Empathize", "Define", "Ideate", "Prototype"]
            },
            {
              title: "UI Fundamentals",
              subsections: ["Typography", "Color Systems", "Layout Grids"]
            },
            {
              title: "UX Tools",
              subsections: ["Wireframes", "Figma 101", "Clickable Prototypes"]
            }
          ]
        },
        "Data Science": {
          tags: ["python", "pandas", "machine learning", "ai", "statistics"],
          base: [
            {
              title: "Intro to Data",
              subsections: ["Data Types", "CSV/JSON Parsing", "Python for Data"]
            },
            {
              title: "Pandas & Analysis",
              subsections: ["DataFrames", "Cleaning Data", "Visualizations"]
            },
            {
              title: "Intro to Machine Learning",
              subsections: ["Supervised vs Unsupervised", "Model Training", "Scikit-learn"]
            }
          ]
        }
      };

      const difficulties = ["Beginner", "Intermediate", "Advanced"];
      const sampleTitles = {
        "Web Development": [
          "Full Stack PHP Bootcamp",
          "Responsive Frontend with HTML/CSS/JS",
          "Backend Web APIs with PHP & MySQL"
        ],
        "Design": [
          "Mastering Figma: UI from Scratch",
          "UX Research for Real Products",
          "Design Systems in Practice"
        ],
        "Data Science": [
          "Python for Data Science",
          "Exploratory Data Analysis with Pandas",
          "Build Your First ML Model"
        ]
      };

      // Pick a category
      const categoryKeys = Object.keys(categories);
      const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
      const catData = categories[category];

      // Pick title & build course
      const title = sampleTitles[category][Math.floor(Math.random() * sampleTitles[category].length)];
      const description = `This ${category.toLowerCase()} course covers ${catData.base.map(s => s.title.toLowerCase()).join(", ")}.`;
      const level = difficulties[Math.floor(Math.random() * difficulties.length)];
  const styles = ['video', 'text', 'interactive'];

      return {
        id: id || crypto.randomUUID(),
        title,
        description,
        category,
        level,
        approved: true,
          approvalNote: "", // optional
          //analytics
          views: 132,
          enrollments: ['1', '3'], // user ids that enrolled
          revenue: 6400,
           instructor: `Instructor ${id}`,
        style: styles[Math.floor(Math.random() * styles.length)],
        price: Math.floor(Math.random() * 5 + 5) * 1000, // 5000–9000 NGN
        tags: pickRandomSubset(catData.tags, 3),
        image: `https://img-c.udemycdn.com/course/480x270/382300_f75b_3.jpg?text=Course+${id}`,
        thumbnail: `https://source.unsplash.com/random/400x200?sig=${Math.random()}`,
        introVideo: getSampleVideo(),
        curriculum: catData.base.map(section => ({
          title: section.title,
            collapsed: true,
          children: section.subsections.map( (title,i) => ({
            title,
            unlocked: i===0,
           // locked: true,
            video: getSampleVideo()
          }))
        }))
      };
    }

    // Helpers
    function pickRandomSubset(arr, count) {
      return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
    }

    function getSampleVideo() {
      const videos = [
        "https://www.youtube.com/watch?v=OK_JCtrrv-c",
        "https://vimeo.com/76979871",
        "https://www.youtube.com/watch?v=w7ejDZ8SWv8"
      ];
      return videos[Math.floor(Math.random() * videos.length)];
    }
