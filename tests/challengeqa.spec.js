// @ts-check
// Importar las dependencias necesarias para ejecutar las pruebas
const { test, expect } = require('@playwright/test');
var envVars = require("../utils/env.variables.json");

// Importar los Builders
const { LoginBuilder } = require("../builders/dex_manager/dManager_login_builder");

// Importar los Page Objects
const { dManagerLoginPage } = require("../pageObjects/dex_manager/dManager_login");
const { dManagerDashboard } = require("../pageObjects/dex_manager/dManager_dashboard");

// Importar funciones reutilizables
const { FuncionesReutilizables } = require("../utils/funciones");

// Definir horario 
const date = new Date();
const hour = date.toLocaleString('es-AR', {hour: '2-digit'});
const minute = date.toLocaleString('es-AR', {minute: '2-digit'});
const second = date.toLocaleString('es-AR', {second: '2-digit'});
const hora_ejecucion = hour + "." + minute + "." + second;


test("Dex Manager - Login", async({ page }, testInfo) => {

  // Crear una instancia de la clase FuncionesReutilizables
  let funcionesReutilizables = new FuncionesReutilizables(page);
  let nombre_test = testInfo.title;

  // Inicializar los Builders
  const loginBuilder = new LoginBuilder().dManagerLogin().build();

  // Inicializar los Page Objects
  const dexManagerLoginPage = new dManagerLoginPage(page);
  const dexManagerDashboard = new dManagerDashboard(page);

  // Navegar a la URL de Dex Manager
  await page.goto(envVars.Dex_Manager_URL);

  // Esperar a que el botón de inicio de sesión esté visible
  await page.waitForSelector(dexManagerLoginPage.botonIniciarSesion, { state: 'visible' });

  // Captura de pantalla de la página de inicio de sesión
  await funcionesReutilizables.screenshot(nombre_test, hora_ejecucion, "Login page");

  // Realizar el inicio de sesión utilizando las credenciales del LoginBuilder
  await dexManagerLoginPage.login(loginBuilder.username, loginBuilder.password);

  // Esperar a que el elemento con el selector 'div.circle' esté oculto
  await page.waitForSelector('div.circle', { state: 'hidden' });

  // Captura de pantalla de la página del dashboard después del inicio de sesión exitoso
  await funcionesReutilizables.screenshot(nombre_test, hora_ejecucion, "Login ok - Dashboard");

  // Asegurarse de que el título del dashboard sea visible, lo que indica que el inicio de sesión fue exitoso
  await expect(page.waitForSelector(dexManagerDashboard.title, { state: 'visible' })).resolves.toBeTruthy();

});
