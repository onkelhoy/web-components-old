export const style = `:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, var(--radius-small))); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, var(--radius-medium))); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, var(--radius-large))); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, var(--radius-max))); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-s)); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-m)); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-l)); }

:host([elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-xl)); }

:host([elevation-direction="horizontal"][elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-horizontal-s)); }

:host([elevation-direction="horizontal"][elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-horizontal-m)); }

:host([elevation-direction="horizontal"][elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-horizontal-l)); }

:host([elevation-direction="horizontal"][elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-horizontal-xl)); }`;
