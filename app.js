const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter({ serviceName: 'my-service' , endpoint: 'http://seu-servico-jaeger:14268/api/traces' })));

provider.register();

const { trace } = require('@opentelemetry/api');

const main = () => {
  const tracer = trace.getTracer('example-tracer');

  tracer.startActiveSpan('main-operation', (span) => {
    performSomeOperation();

    span.end();
  });
};

const performSomeOperation = () => {
  const tracer = trace.getTracer('example-tracer');

  tracer.startActiveSpan('perform-some-operation', (span) => {
    span.end();
  });
};

main();
