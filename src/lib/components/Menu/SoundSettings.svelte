<script lang="ts">
	const props = $props<{ classMenu: string }>();
</script>

<div class={props.classMenu}>
	<ul class="flex flex-col gap-4">
		<li class="flex flex-col gap-2">
			<label class="text-sm" for="rain_range">Rain effects</label>

			<input type="range" class="range-slider" />
		</li>

		<li class="flex flex-col gap-2">
			<label class="text-sm" for="city_range">City effects</label>
			<input id="city_range" class="range-slider" type="range" />
		</li>

		<li class="flex flex-col gap-2">
			<label class="text-sm" for="sound_range">Music sound</label>
			<input id="sound_range" type="range" class="range-slider" />
		</li>
	</ul>
</div>
