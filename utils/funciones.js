var envVars = require("../utils/env.variables.json")


exports.FuncionesReutilizables = class FuncionesReutilizables{
    constructor(page){
        this.page = page;
    }

    screenshot = async(nombre_test, time, nombre_foto) => {

        const date = new Date();
        const day = date.toLocaleString('es-AR', {day: '2-digit'});
        const month = date.toLocaleString('es-AR', {month: '2-digit'});
        const year = date.toLocaleString('es-AR', {year: 'numeric'});

        let fecha_actual = day + "-" + month + "-" + year + "/" + time + "/";

        let ruta_carpeta_evidencias = "Evidencias/"

        let ruta_completa_evidencia = ruta_carpeta_evidencias + fecha_actual + nombre_test + "/" + envVars.contadorFoto + " - " + nombre_foto + ".png";

        envVars.contadorFoto += 1;

        await this.page.screenshot({ path: ruta_completa_evidencia, fullPage: true });
    }
}