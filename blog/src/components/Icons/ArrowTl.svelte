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
    d="M19 19L6 6m0 0v12.48M6 6h12.48"
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg
>
