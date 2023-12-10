// 参考: https://qiita.com/Rityado/items/aee8fe37d6cc1984bf8c

import React, { useEffect, useCallback } from "react";

const AllScrollLock: React.FC = React.memo(() => {
  /**
   * イベントリスナーの設定
   */
  useEffect(() => {
    // モバイルスクロール禁止処理
    document.addEventListener("touchmove", scrollNo, { passive: false });

    return () => {
      // イベントの設定解除
      document.removeEventListener("touchmove", scrollNo);
    };
  }, []);

  /**
   * モバイルスクロール禁止処理
   */
  const scrollNo = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  return <></>;
});

export default AllScrollLock;
