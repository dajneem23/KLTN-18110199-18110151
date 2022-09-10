<template>
	<div>
		<b-modal
			:id="registerModalId"
			hide-footer
			hide-header
			centered
			body-class="registerModal__body"
			content-class="registerModal__content"
			dialog-class="registerModal__dialog"
			no-close-on-backdrop
			no-close-on-esc
		>
			<div ref="modalBody">
				<div class="registerModal__closeBtn" @click="onClose">
					<img class="registerModal__closeIcon" />
				</div>
				<div class="registerModal__title">案件が登録されました。</div>
				<div class="registerModal__contentBlock">
					<div class="registerModal__textBlock">
						<p>クライアントにプロセス画面URLの案内がメールで送付されました。</p>
						<p>クライアント側のログインは不要です。</p>
						<p>クライアント以外にはお知らせしないようご注意ください。</p>
					</div>
					<div class="registerModal__textBlock">
						<p>LINE通知を選択した場合、クライアントにCoMoDe LINE公式アカウントを</p>
						<p>登録してもらう必要があります。</p>
						<p>以下のURLをコピーして、クライアントにお知らせください。</p>
						<p>(クライアントに送付された、案内メールにも記載されています)</p>
					</div>
				</div>
				<div class="registerModal__contentBlock">
					<div class="registerModal__url">{{ url }}</div>
					<div class="registerModal__copyBtn" @click="onCopy(url)">
						{{ buttonText }}
					</div>
				</div>
				<p>※プロセス画面URLと公式LINE登録URLは</p>
				<p>案件編集画面からも確認できます。</p>
			</div>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: 'RegisterModal',
	props: {
		registerModalId: {
			type: String,
		},
		url: {
			type: String,
		},
	},
	data() {
		return {
			buttonText: 'LINE用URLをコピー',
		};
	},
	methods: {
		onCopy(copyData) {
			let self = this;
			this.$copyText(copyData, this.$refs.modalBody).then(
				function (e) {
					console.log(e);
					self.buttonText = 'コピー済み';
					setTimeout(() => {
						self.buttonText = 'LINE用URLをコピー';
					}, 1000);
				},
				function (e) {
					self.buttonText = 'コピー失敗';
					console.log(e);
				}
			);
		},
		onClose() {
			this.$bvModal.hide(`${this.registerModalId}`);
		},
	},
};
</script>

<style lang="scss" src="./RegisterModal.scss" scopped></style>
