<template>
	<div>
		<b-modal
			:id="notificationModalId"
			hide-footer
			hide-header
			centered
			body-class="notiModal__body"
			content-class="notiModal__content"
			dialog-class="notiModal__dialog"
			no-close-on-backdrop
			no-close-on-esc
		>
			<div class="notiModal__notiContent">{{ notiContent }}</div>
			<div v-if="!singleBtn" class="notiModal__buttonContainer">
				<button class="notiModal__cancelBtn" @click="onClick(false)">いいえ</button>
				<button class="notiModal__acceptBtn" @click="onClick(true)">はい</button>
			</div>
			<div v-if="singleBtn" class="notiModal__buttonContainer">
				<button class="notiModal__cancelBtn" @click="onClick(false)">はい</button>
			</div>
		</b-modal>
	</div>
</template>

<script>
export default {
	props: {
		notiContent: {
			type: String,
		},
		notificationModalId: {
			type: String,
		},
		singleBtn: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		onClick(data) {
			if (data) {
				this.$emit('on-click');
				this.$bvModal.hide(`${this.notificationModalId}`);
			} else {
				this.$bvModal.hide(`${this.notificationModalId}`);
			}
		},
	},
};
</script>

<style lang="scss" src="./NotificaitonModal.scss"></style>
