function addFooter() {
    let footer = document.getElementsByTagName("footer")[0]
    let footerText =   `<div class="footer-layer">
                            <a class="footer-layer" target="_blank" href="https://discord.gg/vX87VFVphg" style="user-select: none;">Discord</a>
                            <a class="footer-layer" target="_blank" href="https://github.com/ItZZefirfy/quantum" style="user-select: none;">Github</a>
                            <a class="footer-layer" href="authors.html" style="user-select: none;">Авторы</a>
                        </div>
                        <div class="footer-layer">
                            <version class="footer-item">version 1.0.0.0</version>
                            <i class='footer-item bx bx-copyright'>Zefirfy</i>
                        </div>`
    
    footer.innerHTML = footerText
}

/*
`<div class="footer-layer">
                            <a class="footer-layer" href="" style="user-select: none;">discord</a>
                            <a class="footer-layer" href="" style="user-select: none;">telegram</a>
                            <a class="footer-layer" href="" style="user-select: none;">youtube</a>
                        </div>
                        <div class="footer-layer">
                            <a class="footer-layer" href="authors.html" style="user-select: none;">Авторы</a>
                            <a class="footer-layer" href="" style="user-select: none;">Github</a>
                        </div>
                        <div class="footer-layer">
                            <version class="footer-item">version 3.0.0.0</version>
                            <i class='footer-item bx bx-copyright'>Zefirfy</i>
                        </div>`

*/