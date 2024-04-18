// tools
import '@pap-it/system-doc';

// component
import '@pap-it/button';

window.onload = () => {
  console.log('[demo]: window loaded');

  const component_table = document.querySelector('section#component + section tbody');

  for (let size of ["medium", "small", "large"]) {
    generateComponent(component_table, size, ["primary", "secondary", "inverse", "disabled"]);
    generateComponent(component_table, size, ["danger", "warning", "success"]);
  }
}

function insertComponent(tr, color, variant, size, state) {
  const td = document.createElement("td");
  td.innerHTML = `
      <div>
        <pap-button 
          ${state !== "normal" ? `class="${state}"` : ''} 
          ${color === "disabled" ? "disabled" : ""} 
          variant="${variant}" 
          size="${size}" 
          color="${color}"
        >
          <pap-icon slot="prefix" name="check" cache="true">OK</pap-icon>
          Button
        </pap-button>
        <pap-button 
          circle
          ${state !== "normal" ? `class="${state}"` : ''} 
          ${color === "disabled" ? "disabled" : ""} 
          variant="${variant}" 
          size="${size}" 
          color="${color}"
        >
          <pap-icon cache="true" name="arrow-right">-></pap-icon>
        </pap-button>
      </div>
    `

  tr.appendChild(td);
}
function generateComponent(table, size, colors) {
  for (let variant of ["filled", "outlined", "clear"]) {
    const tr = document.createElement("tr");

    const first_column = document.createElement("td");
    first_column.innerHTML = `<pap-typography align="center" variant="C2">${variant}</pap-typography>`;
    tr.appendChild(first_column);

    for (let color of colors) {
      if (color === "disabled") {
        insertComponent(tr, color, variant, size, "normal");
        continue
      }

      for (let state of ["normal", "hover", "pressed"]) {
        insertComponent(tr, color, variant, size, state);
      }
    }

    table.appendChild(tr);
  }
}