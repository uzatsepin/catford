document.addEventListener('DOMContentLoaded', function () {
	function isMobile() {
		return window.innerWidth <= 768
	}

	var scenes = document.querySelectorAll('.main__item-img')
	scenes.forEach(function (scene) {
		new Parallax(scene)
	})

	var parallaxElements = document.querySelectorAll('.header__dots-left, .header__dots-right, .header__dots-bottom')
	parallaxElements.forEach(function (element) {
		new Parallax(element)
	})

	var parallaxElements = document.querySelectorAll('.main__item-dots')
	parallaxElements.forEach(function (element) {
		new Parallax(element)
	})

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in')
				observer.unobserve(entry.target)
			}
		})
	})

	document
		.querySelectorAll(
			'.header__offer, .header__social, .header__logo, .header__dots-left, .header__dots-right, .header__dots-bottom, .main__item, .supply__item, .footer',
		)
		.forEach(element => {
			observer.observe(element)
		})

	function handleScroll() {
		if (!isMobile()) return

		var scrollTop = window.pageYOffset || document.documentElement.scrollTop

		document.querySelectorAll('.main__item-img img, .main__item-dots img').forEach(function (img) {
			var depth = img.getAttribute('data-depth')

			var movementX = (scrollTop * depth) / 10 // Корректируем деление для более заметного движения
			var movementY = (scrollTop * depth) / 10
			movementX = Math.min(30, movementX) // Ограничение движения до 30px
			movementY = Math.min(30, movementY) // Ограничение движения до 30px
			img.style.transform = 'translate(' + movementX + 'px, ' + movementY + 'px)'
		})
	}

	window.addEventListener('scroll', handleScroll)

	function copyToClipboard(text) {
		return navigator.clipboard.writeText(text)
	}

	// Найти все элементы с классом 'supply__address'
	var supplyAddressElements = document.querySelectorAll('.supply__address')

	// Добавить обработчик клика для каждого элемента
	supplyAddressElements.forEach(function (element) {
		element.addEventListener('click', function () {
			var value = element.getAttribute('data-value')
			var originalText = element.textContent // Сохранить оригинальный текст

			if (value) {
				copyToClipboard(value)
					.then(function () {
						element.textContent = 'Скопировано'
						setTimeout(function () {
							element.textContent = originalText
						}, 3000) // Вернуть оригинальный текст через 3 секунды
					})
					.catch(function (err) {
						console.error('Не удалось скопировать текст: ', err)
					})
			}
		})
	})
})
