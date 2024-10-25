# Proxy

## 目標

目標： background.tsのstateが更新されたらサブスクライバへmessage-passing経由で更新を知らせるようにする。

理由： popup.tsxはudemyの講義ページの状態を表示するようになったため

## Proxy

## Popupでメッセージをリアルタイムに受け取るにはReactの機能では無理なのでは？

つまりaddEventListener()が常に必要で、それを常に更新のたびにアタッチしなおす処理が必要である

## 走り書き

#### ひとまず動かすまでにおさらいする基本的な機能

localstorageへstateを保存する


#### re-transcript/src/background/background.tsのメッセージ機能について

レビュー