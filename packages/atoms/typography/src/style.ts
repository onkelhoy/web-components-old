export const style = `:host {
  text-align: left;
  display: block;
  color: inherit; }

:host([inline]) {
  display: inline; }

:host([alignment="center"]),
:host([align="center"]) {
  text-align: center; }

:host([alignment="justify"]),
:host([align="justify"]) {
  text-align: justify; }

:host([alignment="start"]),
:host([align="start"]) {
  text-align: start; }

:host([alignment="end"]),
:host([align="end"]) {
  text-align: end; }

:host([alignment="left"]),
:host([align="left"]) {
  text-align: left; }

:host([alignment="right"]),
:host([align="right"]) {
  text-align: right; }

:host([alignment="unset"]),
:host([align="unset"]) {
  text-align: unset; }

:host([alignment="inherit"]),
:host([align="inherit"]) {
  text-align: inherit; }

:host([alignment="initial"]),
:host([align="initial"]) {
  text-align: initial; }

:host([nowrap="true"]) {
  white-space: nowrap; }

:host([truncate="true"]) {
  white-space: nowrap;
  /* this ensures text remains on a single line */
  overflow: hidden;
  /* hides any overflow */
  text-overflow: ellipsis;
  /* shows ellipsis for any overflow */ }

:host([variant="heading1"]),
:host([variant="H1"]) {
  font-family: var(--typography-h1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h1-fontsize, 8.75rem);
  font-weight: var(--typography-h1-fontweight, 800);
  line-height: var(--typography-h1-lineheight, 120%);
  letter-spacing: var(--typography-h1-letterspacing, 0); }

:host([variant="heading2"]),
:host([variant="H2"]) {
  font-family: var(--typography-h2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h2-fontsize, 5.5rem);
  font-weight: var(--typography-h2-fontweight, 800);
  line-height: var(--typography-h2-lineheight, 120%);
  letter-spacing: var(--typography-h2-letterspacing, 0); }

:host([variant="heading3"]),
:host([variant="H3"]) {
  font-family: var(--typography-h3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h3-fontsize, 5rem);
  font-weight: var(--typography-h3-fontweight, 700);
  line-height: var(--typography-h3-lineheight, 120%);
  letter-spacing: var(--typography-h3-letterspacing, 0); }

:host([variant="heading4"]),
:host([variant="H4"]) {
  font-family: var(--typography-h4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h4-fontsize, 4rem);
  font-weight: var(--typography-h4-fontweight, 700);
  line-height: var(--typography-h4-lineheight, 120%);
  letter-spacing: var(--typography-h4-letterspacing, 0); }

:host([variant="heading5"]),
:host([variant="H5"]) {
  font-family: var(--typography-h5-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h5-fontsize, 3.5rem);
  font-weight: var(--typography-h5-fontweight, 400);
  line-height: var(--typography-h5-lineheight, 120%);
  letter-spacing: var(--typography-h5-letterspacing, 0); }

:host([variant="title1"]),
:host([variant="T1"]) {
  font-family: var(--typography-t1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t1-fontsize, 3rem);
  font-weight: var(--typography-t1-fontweight, 700);
  line-height: var(--typography-t1-lineheight, 120%);
  letter-spacing: var(--typography-t1-letterspacing, 0); }

:host([variant="title2"]),
:host([variant="T2"]) {
  font-family: var(--typography-t2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t2-fontsize, 2.5rem);
  font-weight: var(--typography-t2-fontweight, 700);
  line-height: var(--typography-t2-lineheight, 120%);
  letter-spacing: var(--typography-t2-letterspacing, 0); }

:host([variant="title3"]),
:host([variant="T3"]) {
  font-family: var(--typography-t3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t3-fontsize, 2rem);
  font-weight: var(--typography-t3-fontweight, 600);
  line-height: var(--typography-t3-lineheight, 120%);
  letter-spacing: var(--typography-t3-letterspacing, 0); }

:host([variant="title4"]),
:host([variant="T4"]) {
  font-family: var(--typography-t4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t4-fontsize, 1.5rem);
  font-weight: var(--typography-t4-fontweight, 600);
  line-height: var(--typography-t4-lineheight, 140%);
  letter-spacing: var(--typography-t4-letterspacing, 0); }

:host([variant="copy1"]),
:host([variant="C1"]) {
  font-family: var(--typography-c1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c1-fontsize, 1.5rem);
  font-weight: var(--typography-c1-fontweight, 500);
  line-height: var(--typography-c1-lineheight, 140%);
  letter-spacing: var(--typography-c1-letterspacing, 0.01rem); }

:host([variant="copy2"]),
:host([variant="C2"]) {
  font-family: var(--typography-c2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c2-fontsize, 1rem);
  font-weight: var(--typography-c2-fontweight, 600);
  line-height: var(--typography-c2-lineheight, 140%);
  letter-spacing: var(--typography-c2-letterspacing, 0.01rem); }

:host([variant="copy3"]),
:host([variant="C3"]) {
  font-family: var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c3-fontsize, 1rem);
  font-weight: var(--typography-c3-fontweight, 400);
  line-height: var(--typography-c3-lineheight, 140%);
  letter-spacing: var(--typography-c3-letterspacing, 0.01rem); }

:host([variant="copy4"]),
:host([variant="C4"]) {
  font-family: var(--typography-c4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c4-fontsize, 0.75rem);
  font-weight: var(--typography-c4-fontweight, 400);
  line-height: var(--typography-c4-lineheight, 140%);
  letter-spacing: var(--typography-c4-letterspacing, 0.01rem); }

:host([variant="button1"]),
:host([variant="B1"]) {
  font-family: var(--typography-b1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b1-fontsize, 1rem);
  font-weight: var(--typography-b1-fontweight, 600);
  line-height: var(--typography-b1-lineheight, 140%);
  letter-spacing: var(--typography-b1-letterspacing, 0.01rem); }

:host([variant="button2"]),
:host([variant="B2"]) {
  font-family: var(--typography-b2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b2-fontsize, 1rem);
  font-weight: var(--typography-b2-fontweight, 600);
  line-height: var(--typography-b2-lineheight, 140%);
  letter-spacing: var(--typography-b2-letterspacing, 0.01rem);
  text-decoration: underline; }`;
