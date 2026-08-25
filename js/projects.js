import supabase from "../database/supabase.js";

const track = document.getElementById("projectsTrack");

async function loadProjects() {
    try {
        const { data: projects, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error loading projects:", error);
            return;
        }

        if (!projects || projects.length === 0) {
            track.innerHTML = `
                <p class="no-projects">
                    No projects available.
                </p>
            `;
            return;
        }

        let html = "";

        projects.forEach(project => {
            const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : String(project.technologies || "")
                    .split(",")
                    .map(tech => tech.trim())
                    .filter(Boolean);

            html += `
                <div class="project-card">

                    <h3>${project.title || ""}</h3>

                    <p>${project.description || ""}</p>

                    <div class="tech">
                        ${technologies
                            .map(tech => `<span>${tech}</span>`)
                            .join("")}
                    </div>

                    <div class="links">

                        ${
                            project.github
                                ? `
                                    <a href="${project.github}"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        GitHub
                                    </a>
                                  `
                                : ""
                        }

                        ${
                            project.live_demo
                                ? `
                                    <a href="${project.live_demo}"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        Live Demo
                                    </a>
                                  `
                                : ""
                        }

                    </div>

                </div>
            `;
        });

        // Duplicate cards for the infinite horizontal animation
        track.innerHTML = html + html;

    } catch (error) {
        console.error("Unexpected error:", error);

        track.innerHTML = `
            <p class="no-projects">
                Unable to load projects.
            </p>
        `;
    }
}

loadProjects();
