export default function Services() {
  const plans = [
    {
      name: "Starter",
      description: "Best option for personal use & for your next project.",
      price: "$29",
      duration: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 1 developer",
        "Premium support: 6 months",
        "Free updates: 6 months",
      ],
    },
    {
      name: "Company",
      description:
        "Relevant for multiple users, extended & premium support.",
      price: "$99",
      duration: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 10 developers",
        "Premium support: 24 months",
        "Free updates: 24 months",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      description:
        "Best for large scale uses and extended redistribution rights.",
      price: "$499",
      duration: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 100+ developers",
        "Premium support: 36 months",
        "Free updates: 36 months",
      ],
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
            Designed for business teams like yours
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border border-slate-700 bg-[#101010] p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/60 ${
                plan.highlighted
                  ? "ring-1 ring-blue-500 border-indigo-600-500/60"
                  : ""
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {plan.description}
                </p>

                <div className="mt-8 flex items-end justify-center">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-2 mb-1 text-sm text-slate-400">
                    {plan.duration}
                  </span>
                </div>
              </div>

              <ul className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-200"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-10 w-full rounded-lg px-5 py-3 text-sm font-semibold transition duration-200 ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}