function isExtension() {
    return window.chrome && chrome.runtime && chrome.runtime.id;
}

export default isExtension;