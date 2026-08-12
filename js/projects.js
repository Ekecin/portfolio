import supabase from "../database/supabase.js";


const track = document.getElementById("projectsTrack");

async function loadProjects() {
    const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    let html = "";

    projects.forEach(project => {

                html += `
            <div class="project-card">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="tech">
                    ${project.technologies
                        .map(tech => `<span>${tech}</span>`)
                        .join("")}
                </div>

                <div class="links">
                    <a href="${project.github}" target="_blank">
                        GitHub
                    </a>

                    <a href="${project.live_demo}" target="_blank">
                        Live Demo
                    </a>
                </div>

            </div>
        `;

    });

    // Duplicate for infinite scrolling
    track.innerHTML = html + html;
}
alert("hey");
loadProjects();