<script>
  export let size = "50px";
  export let strokeWidth = "1.1";
  export let color = "#000000";
  export let fill = "none";
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  {fill}
  xmlns="http://www.w3.org/2000/svg"
  ><path
    d="M18 16.5V3m0 0l3.5 3.5M18 3l-3.5 3.5M18 16.5a3.5 3.5 0 11-7 0v-9M11 7.5a3.5 3.5 0 10-7 0v12"
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg
>
