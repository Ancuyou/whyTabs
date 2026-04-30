import { VS, FS } from './shaders.js';

let gl, program, buffers = {};
let animationId;

function compileShader(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s));
        return null;
    }
    return s;
}

export function initWebGL(canvas, tier, onComplete) {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const w = canvas.clientWidth * 2;
    const h = canvas.clientHeight * 2;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);

    const vs = compileShader(VS, gl.VERTEX_SHADER);
    const fs = compileShader(FS, gl.FRAGMENT_SHADER);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Generate particles
    const count = tier.particles;
    const pos = new Float32Array(count * 2);
    const offset = new Float32Array(count * 2);
    const life = new Float32Array(count);
    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        pos[i*2] = w/2 + (Math.random()-0.5)*40;
        pos[i*2+1] = h/2 + (Math.random()-0.5)*20;
        offset[i*2] = (Math.random()-0.5)*300;
        offset[i*2+1] = -Math.random()*250 - 50;
        life[i] = 0.4 + Math.random()*0.6;
        scale[i] = 0.6 + Math.random()*0.8;
    }

    buffers.pos = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffers.pos); gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    buffers.offset = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffers.offset); gl.bufferData(gl.ARRAY_BUFFER, offset, gl.STATIC_DRAW);
    buffers.life = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffers.life); gl.bufferData(gl.ARRAY_BUFFER, life, gl.STATIC_DRAW);
    buffers.scale = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffers.scale); gl.bufferData(gl.ARRAY_BUFFER, scale, gl.STATIC_DRAW);

    // Attributes
    const aPos = gl.getAttribLocation(program, 'a_pos');
    const aOffset = gl.getAttribLocation(program, 'a_offset');
    const aLife = gl.getAttribLocation(program, 'a_life');
    const aScale = gl.getAttribLocation(program, 'a_scale');

    [buffers.pos, buffers.offset, buffers.life, buffers.scale].forEach((b, i) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.enableVertexAttribArray(i === 0 ? aPos : i === 1 ? aOffset : i === 2 ? aLife : aScale);
        gl.vertexAttribPointer(i === 0 ? aPos : i === 1 ? aOffset : i === 2 ? aLife : aScale, i < 2 ? 2 : 1, gl.FLOAT, false, 0, 0);
    });

    gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), w, h);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_color'), tier.color);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    canvas.style.display = 'block';
    const start = performance.now();
    const duration = tier.duration / 1000;

    function loop() {
        const t = (performance.now() - start) / 1000;
        gl.uniform1f(gl.getUniformLocation(program, 'u_time'), t * tier.speed);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, count);

        if (t < duration) {
            animationId = requestAnimationFrame(loop);
        } else {
            gl.clear(gl.COLOR_BUFFER_BIT);
            canvas.style.display = 'none';
            gl.deleteProgram(program);
            Object.values(buffers).forEach(gl.deleteBuffer.bind(gl));
            if (onComplete) onComplete();
        }
    }
    animationId = requestAnimationFrame(loop);
}