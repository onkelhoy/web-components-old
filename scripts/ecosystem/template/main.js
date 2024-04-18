import "@pap-it/system-doc";
import "@pap-it/sidebar";
import "@pap-it/tools-routing";

function changeSelected() {
  // we need to pre-select something 
  const [atomic, name] = window.location.pathname.split('/').filter(v => !!v);
  if (atomic && name) {
    // select the item if exist 
    const item = document.querySelector(`#${atomic}_${name}`);
    if (item) {
      item.click();
    }
  }
}

window.onload = () => {
  // check if we already have a url 
  const sidebar = document.querySelector('pap-sidebar.designsystem');

  window.addEventListener('popstate', changeSelected);

  if (window.location.pathname !== "/") {
    setTimeout(changeSelected, 100);
  }

  sidebar.addEventListener('select', e => {
    const [atomic, name] = e.detail.id.split('_') // used in "ecosystem/build.js"
    const router = document.querySelector('pap-routing-tool');

    const newURL = `/${atomic}/${name}/`
    router.setAttribute('asset-base', `packages${newURL}`);
    router.setAttribute('url', 'index.html');

    window.history.pushState({
      url: newURL,
    }, name, newURL);

  })
}