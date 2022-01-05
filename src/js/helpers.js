class Helpers {
  static setLoader(container) {
    try {
      container.innerHTML = `
        <div class="loader">
          <div class="core"></div>
          <div class="elip elip-first"></div>
          <div class="elip elip-second"></div>
          <div class="elip elip-third"></div>
        </div>
        <div class="loader shadow">
          <div class="core"></div>
          <div class="elip elip-first"></div>
          <div class="elip elip-second"></div>
          <div class="elip elip-third"></div>
        </div>
      `;
    } catch (e) {
      console.warn(e);
    }
  }

  static removeLoader(container) {
    try {
      container.querySelectorAll('.loader').forEach(el => el.remove);
    } catch (e) {
      console.warn(e);
    }
  }
}

export default Helpers;
