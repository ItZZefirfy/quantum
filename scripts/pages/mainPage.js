window.onscroll = () => {
    const maxScroll = 10
    if (
        document.body.scrollTop > maxScroll || 
        document.documentElement.scrollTop > maxScroll
    ) {
        document.getElementById("black-background").style.opacity = 0
    } else {
        document.getElementById("black-background").style.opacity = 1
    }
}

/*
                    <a href=""><i class='bx bx-list-ol'></i>Impossible Level List</a>
                    <a href=""><i class='bx bx-list-ol'></i>Impossible Challenge List</a>
*/