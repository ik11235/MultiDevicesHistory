# MultiDevicesHistory

![icon](https://github.com/ik11235/MultiDevicesHistory/raw/master/images/icon128.png)

# about

「MultiDevicesHistory」は同一のchromeアカウントで使用しているデバイスで開いているタブ情報を一括表示できるChrome拡張です。

Chrome標準の履歴は直近使用したタブのみ表示されますが、この拡張では開いているすべてのタブが確認可能です。


# インストール

Coming Soon.

# チェンジログ
[CHANGELOG](CHANGELOG.md)

# ライセンス

[MIT](LICENSE)

## アイコン

この拡張のアプリアイコンは[ICOON MONO様](https://icooon-mono.com/)の以下の素材を使用しています。

- [スマホアイコン](https://icooon-mono.com/16145-%e3%82%b9%e3%83%9e%e3%83%9b%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3/)
- [無料のタブレットアイコン素材](https://icooon-mono.com/11052-%e7%84%a1%e6%96%99%e3%81%ae%e3%82%bf%e3%83%96%e3%83%ac%e3%83%83%e3%83%88%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90/)
- [ノートパソコンのアイコン素材4 ](https://icooon-mono.com/11049-%e3%83%8e%e3%83%bc%e3%83%88%e3%83%91%e3%82%bd%e3%82%b3%e3%83%b3%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%904/)
- [Free desktop PC icon](https://icooon-mono.com/11043-free-desktop-pc-icon/)
- [リロードアイコン](https://icooon-mono.com/15804-%e3%83%aa%e3%83%ad%e3%83%bc%e3%83%89%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3/)

### generate comand

```shell script
#!/bin/bash

for size in 16 32 48 128;
do
    convert source.png -resize ${size}x  -unsharp 1.5x1+0.7+0.02 icon${size}.png;
done
```

参考: https://qiita.com/ygkn/items/efa1e311006f5c900123

## 使用しているライブラリ

- [UIkit](https://getuikit.com/)

- [使用ライブラリのライセンスクレジット一覧](CREDITS)

