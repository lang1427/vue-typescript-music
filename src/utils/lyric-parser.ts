const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

const tagRegMap = {
  title: "ti",
  artist: "ar",
  album: "al",
  offset: "offset",
  by: "by",
};

function noop() {}
// export default class Lyric{
export default class Lyric {
  lrc: string;
  tags: { [key: string]: string };
  lines: { time: number; txt: string }[];
  handler: (arg: { txt: string; lineNum: number }) => void;
  state: number;
  curLine: number;
  timer: number | undefined;
  curNum: number | undefined;
  count: number | undefined;
  startStamp: number | undefined;
  pauseStamp: number | undefined;
  constructor(lrc: string, hanlder = noop) {
    this.lrc = lrc;
    this.tags = {};
    this.lines = [];
    this.handler = hanlder;
    this.state = STATE_PAUSE;
    this.curLine = 0;
    this._init();
  }

  _init() {
    this._initTag();

    this._initLines();
  }

  _initTag() {
    for (let tag in tagRegMap) {
      const matches = this.lrc.match(
        new RegExp(
          `\\[${tagRegMap[tag as keyof typeof tagRegMap]}:([^\\]]*)]`,
          "i"
        )
      );
      this.tags[tag] = (matches && matches[1]) || "";
    }
  }

  _initLines() {
    const lines = this.lrc.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let result = timeExp.exec(line);
      if (result) {
        const txt = line.replace(timeExp, "").trim();
        if (txt) {
          let tirdResult = result[3] || "0";
          let length = tirdResult.length;
          let __tirdResult = parseInt(tirdResult, 10);
          __tirdResult =
            length > 2 && __tirdResult < 100
              ? __tirdResult
              : __tirdResult > 99
              ? __tirdResult
              : __tirdResult * 10;
          this.lines.push({
            time:
              parseInt(result[1], 10) * 60 * 1000 +
              parseInt(result[2], 10) * 1000 +
              __tirdResult,
            txt,
          });
        }
      }
    }

    this.lines.sort((a, b) => {
      return a.time - b.time;
    });
  }

  _findCurNum(time: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  _callHandler(i: number) {
    if (i < 0) {
      return;
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i,
    });
  }

  _playRest() {
    let line = this.lines[<number>this.curNum];
    let delay = line.time - (+new Date() - <number>this.startStamp);

    this.timer = setTimeout(() => {
      this._callHandler((<number>this.curNum)++);
      if (
        <number>this.curNum < this.lines.length &&
        this.state === STATE_PLAYING
      ) {
        this._playRest();
      }
    }, delay);
  }

  play(startTime = 0, skipLast?: boolean) {
    if (!this.lines.length) {
      return;
    }
    this.state = STATE_PLAYING;

    this.curNum = this._findCurNum(startTime);
    this.startStamp = +new Date() - startTime;

    if (!skipLast) {
      this._callHandler(this.curNum - 1);
    }

    if (this.curNum < this.lines.length) {
      clearTimeout(this.timer);
      this._playRest();
    }
  }

  togglePlay() {
    var now = +new Date();
    if (this.state === STATE_PLAYING) {
      this.stop();
      this.pauseStamp = now;
    } else {
      this.state = STATE_PLAYING;
      this.play((this.pauseStamp || now) - (this.startStamp || now), true);
      this.pauseStamp = 0;
    }
  }

  stop() {
    this.state = STATE_PAUSE;
    clearTimeout(this.timer);
  }

  seek(offset: number) {
    this.play(offset);
  }
}
