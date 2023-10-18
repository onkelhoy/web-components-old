// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/button/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    const component_table = document.querySelector('section#component + section tbody');

    for (let size of ["medium", "small", "large"])
    {
        generateComponent(component_table, size, ["primary", "secondary", "inverse", "disabled"]);
        generateComponent(component_table, size, ["danger", "warning", "success"]);
    }
}

function insertComponent (tr, color, variant, size, state) {
    const td = document.createElement("td");
    td.innerHTML = `
        <div>
            <o-button 
                ${state !== "normal" ? `class="${state}"` : ''} 
                ${color === "disabled" ? "disabled" : ""} 
                variant="${variant}" 
                size="${size}" 
                color="${color}"
            >
                <o-icon slot="prefix" name="check" cache="true">OK</o-icon>
                Button
            </o-button>
            <o-button 
                circle
                ${state !== "normal" ? `class="${state}"` : ''} 
                ${color === "disabled" ? "disabled" : ""} 
                variant="${variant}" 
                size="${size}" 
                color="${color}"
            >
                <o-icon cache="true" name="arrow-right">-></o-icon>
            </o-button>
        </div>
    `

    tr.appendChild(td);
}
function generateComponent (table, size, colors) {
    for (let variant of ["filled", "outlined", "clear"])
    {
        const tr = document.createElement("tr");
        
        const first_column = document.createElement("td");
        first_column.innerHTML = `<o-typography align="center" variant="C2">${variant}</o-typography>`;
        tr.appendChild(first_column);

        for (let color of colors)
        {
            if (color === "disabled") 
            {
                insertComponent(tr, color, variant, size, "normal");
                continue
            }

            for (let state of ["normal", "hover", "pressed"])
            {
                insertComponent(tr, color, variant, size,state);
            }
        }

        table.appendChild(tr);
    }
}