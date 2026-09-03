document.addEventListener("DOMContentLoaded", function () {

    const sistemaCookies = document.createElement("div");

    sistemaCookies.innerHTML = `

        <div class="cookies-banner" id="cookiesBanner">

            <div class="cookies-contenido">

                <div class="cookies-texto">

                    <h3>Tu privacidad es importante</h3>

                    <p>
                        Utilizamos cookies necesarias para el funcionamiento
                        del sitio y, con tu permiso, podremos utilizar cookies
                        adicionales para mejorar nuestros servicios y analizar
                        el uso de la web.

                        Puedes aceptar, rechazar o configurar tus preferencias.

                        Consulta nuestra
                        <a href="politica-cookies.html">
                            Política de Cookies
                        </a>.
                    </p>

                </div>

                <div class="cookies-acciones">

                    <button type="button"
                            class="cookies-boton cookies-rechazar"
                            id="rechazarCookies">
                        Rechazar
                    </button>

                    <button type="button"
                            class="cookies-boton cookies-configurar"
                            id="configurarCookies">
                        Configurar
                    </button>

                    <button type="button"
                            class="cookies-boton cookies-aceptar"
                            id="aceptarCookies">
                        Aceptar
                    </button>

                </div>

            </div>

        </div>


        <div class="cookies-modal" id="cookiesModal">

            <div class="cookies-modal-contenido">

                <div class="cookies-modal-cabecera">

                    <div>
                        <p class="cookies-modal-etiqueta">
                            PRIVACIDAD
                        </p>

                        <h2>Configurar cookies</h2>
                    </div>

                    <button type="button"
                            class="cookies-cerrar"
                            id="cerrarCookies"
                            aria-label="Cerrar">
                        ×
                    </button>

                </div>


                <p class="cookies-modal-intro">
                    Puedes decidir qué cookies opcionales permites.
                    Las cookies necesarias no pueden desactivarse
                    porque permiten el funcionamiento básico del
                    sitio web.
                </p>


                <div class="cookies-categoria">

                    <div class="cookies-categoria-texto">

                        <h3>Cookies necesarias</h3>

                        <p>
                            Permiten funciones esenciales del sitio
                            y guardar tus preferencias de privacidad.
                        </p>

                    </div>

                    <span class="cookies-siempre">
                        Siempre activas
                    </span>

                </div>


                <div class="cookies-categoria">

                    <div class="cookies-categoria-texto">

                        <h3>Cookies de análisis</h3>

                        <p>
                            Nos permitirían conocer de forma estadística
                            cómo se utiliza la web para mejorar SUMEXA.
                        </p>

                    </div>

                    <label class="cookies-switch">

                        <input type="checkbox"
                               id="cookiesAnaliticas">

                        <span class="cookies-slider"></span>

                    </label>

                </div>


                <div class="cookies-categoria">

                    <div class="cookies-categoria-texto">

                        <h3>Cookies publicitarias</h3>

                        <p>
                            Podrían utilizarse para medir campañas
                            o mostrar contenidos publicitarios más
                            relevantes.
                        </p>

                    </div>

                    <label class="cookies-switch">

                        <input type="checkbox"
                               id="cookiesPublicidad">

                        <span class="cookies-slider"></span>

                    </label>

                </div>


                <div class="cookies-modal-pie">

                    <a href="politica-cookies.html">
                        Ver Política de Cookies
                    </a>

                    <button type="button"
                            id="guardarCookies"
                            class="cookies-guardar">
                        Guardar preferencias
                    </button>

                </div>

            </div>

        </div>

    `;

    document.body.appendChild(sistemaCookies);


    const banner =
        document.getElementById("cookiesBanner");

    const modal =
        document.getElementById("cookiesModal");

    const aceptar =
        document.getElementById("aceptarCookies");

    const rechazar =
        document.getElementById("rechazarCookies");

    const configurar =
        document.getElementById("configurarCookies");

    const cerrar =
        document.getElementById("cerrarCookies");

    const guardar =
        document.getElementById("guardarCookies");

    const analiticas =
        document.getElementById("cookiesAnaliticas");

    const publicidad =
        document.getElementById("cookiesPublicidad");


    const preferenciasGuardadas =
        localStorage.getItem("sumexaCookiesPreferencias");


    if (preferenciasGuardadas) {

        try {

            const preferencias =
                JSON.parse(preferenciasGuardadas);

            analiticas.checked =
                preferencias.analiticas === true;

            publicidad.checked =
                preferencias.publicidad === true;

            banner.style.display = "none";

        } catch (error) {

            localStorage.removeItem(
                "sumexaCookiesPreferencias"
            );

        }

    }


    aceptar.addEventListener("click", function () {

        guardarPreferencias({
            necesarias: true,
            analiticas: true,
            publicidad: true
        });

        analiticas.checked = true;
        publicidad.checked = true;

        banner.style.display = "none";

    });


    rechazar.addEventListener("click", function () {

        guardarPreferencias({
            necesarias: true,
            analiticas: false,
            publicidad: false
        });

        analiticas.checked = false;
        publicidad.checked = false;

        banner.style.display = "none";

    });


    configurar.addEventListener("click", function () {

        modal.classList.add("activo");

    });
    /* ABRIR CONFIGURACIÓN DESDE EL FOOTER */

const enlacesConfiguracion =
    document.querySelectorAll(".abrir-configuracion-cookies");

enlacesConfiguracion.forEach(function (enlace) {

    enlace.addEventListener("click", function (event) {

        event.preventDefault();

        modal.classList.add("activo");

    });

});


    cerrar.addEventListener("click", function () {

        modal.classList.remove("activo");

    });


    guardar.addEventListener("click", function () {

        guardarPreferencias({
            necesarias: true,
            analiticas: analiticas.checked,
            publicidad: publicidad.checked
        });

        modal.classList.remove("activo");
        banner.style.display = "none";

    });


    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            modal.classList.remove("activo");
        }

    });


    function guardarPreferencias(preferencias) {

        localStorage.setItem(
            "sumexaCookiesPreferencias",
            JSON.stringify(preferencias)
        );

    }

});