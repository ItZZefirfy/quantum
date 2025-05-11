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