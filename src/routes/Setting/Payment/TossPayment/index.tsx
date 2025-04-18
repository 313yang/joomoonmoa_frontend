import { Button } from "@/components/Styled";
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = import.meta.env.VITE_TOSS_TEST_CLIENT_KEY;
const customerKey = "z1J2aywnxFjZ8tqe0M6Xc"; // TODO:: 나중에 회원ID로 변경

export function TossPayment() {
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50_000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
    return () => {
      fetchPaymentWidgets();
    }

  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "widgetA",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
    return () => {
      renderPaymentWidgets();
    }
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 결제하기 버튼 */}
        <Button
          width="100%"
          size="lg"
          disabled={!ready}
          onClick={async () => {
            if (!widgets) return;
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId: "gJ1LMtuu7B058tomBexFv",
                orderName: "토스 티셔츠 외 2건",
                successUrl: window.location.origin + "/payment-result/success",
                failUrl: window.location.origin + "/payment-result/fail",
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
                customerMobilePhone: "01012341234",
              });
            } catch (error) {
              // 에러 처리하기
              console.log(error);
            }
          }}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}