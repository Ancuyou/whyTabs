export const VS = `
  attribute vec2 a_pos;
  attribute vec2 a_offset;
  attribute float a_life;
  attribute float a_scale;
  uniform vec2 u_resolution;
  uniform float u_time;
  varying float v_life;
  void main() {
    float life = clamp(a_life - u_time * 0.8, 0.0, 1.0);
    v_life = life;
    vec2 final = a_pos + a_offset * (1.0 - life) * u_time;
    final *= a_scale * (1.0 + life * 0.3);
    gl_Position = vec4(final / u_resolution * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = 4.0 + life * 10.0;
  }
`;

export const FS = `
  precision mediump float;
  varying float v_life;
  uniform vec3 u_color;
  void main() {
    vec2 circ = gl_PointCoord - 0.5;
    float d = length(circ);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d) * v_life;
    gl_FragColor = vec4(u_color * (0.7 + v_life * 0.3), alpha);
  }
`;