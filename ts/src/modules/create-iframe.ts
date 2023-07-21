export default function createIframe(videoLink: string): HTMLIFrameElement {

	const iframe: HTMLIFrameElement = document.createElement('iframe');
	const iframeLink: string = videoLink.replace(/watch\?v=/, 'embed/');

	iframe.width = '670';
	iframe.height = '377';
	iframe.style.border = '0';
	iframe.title = 'Видео о проекте';
	iframe.src = iframeLink;
	iframe.allow = 'fullscreen';

	return iframe;
}