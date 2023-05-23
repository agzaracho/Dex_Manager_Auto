exports.dManagerLoginPage = class dManagerLoginPage {


    inputBoxUsuario = 'input[aria-describedby="paper-input-add-on-2"]'
    inputBoxPassword = 'input[type="password"][aria-describedby="paper-input-add-on-3"]'
    botonIniciarSesion = 'paper-button.accept-btn.login-btn'


    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async login(username, password){
        await this.page.type(this.inputBoxUsuario, username, { delay: 50 });
        await this.page.type(this.inputBoxPassword, password, { delay: 50 });
        await this.page.press(this.botonIniciarSesion, "Enter", { delay: 300 });
    }
};
