cmd_Release/obj.target/grpc_node/ext/call.o := g++ -o Release/obj.target/grpc_node/ext/call.o ../ext/call.cc '-DPB_FIELD_32BIT' '-DGPR_BACKWARDS_COMPATIBILITY_MODE' '-DGRPC_ARES=1' '-DGRPC_UV' '-DGRPC_NODE_VERSION="1.24.11"' '-DCARES_STATICLIB' '-DCARES_SYMBOL_HIDING' '-DNODE_GYP_MODULE_NAME=grpc_node' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-DTSI_OPENSSL_ALPN_SUPPORT=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DBUILDING_NODE_EXTENSION' '-DNDEBUG' -I../deps/grpc -I../deps/grpc/include -I../deps/grpc/src/core/ext/upb-generated -I../deps/grpc/third_party/abseil-cpp -I../deps/grpc/third_party/address_sorting/include -I../deps/grpc/third_party/cares -I../deps/grpc/third_party/cares/cares -I../deps/grpc/third_party/nanopb -I../deps/grpc/third_party/upb -I../deps/grpc/third_party/upb/generated_for_cmake -I/root/.cache/node-gyp/18.17.1/include/node -I/root/.cache/node-gyp/18.17.1/src -I/root/.cache/node-gyp/18.17.1/deps/openssl/config -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/uv/include -I/root/.cache/node-gyp/18.17.1/deps/zlib -I/root/.cache/node-gyp/18.17.1/deps/v8/include -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/openssl/config/k8 -I/root/.cache/node-gyp/18.17.1/deps/zlib -I../../nan  -g -Wall -Wextra -DOSATOMIC_USE_INLINED=1 -Ithird_party/upb -Isrc/core/ext/upb-generated -fvisibility=hidden -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -pthread -Wno-error=deprecated-declarations -Wno-cast-function-type -O2 -Wframe-larger-than=16384 -O3 -fno-omit-frame-pointer -std=c++14 -fno-rtti -fno-exceptions -std=gnu++17 -MMD -MF ./Release/.deps/Release/obj.target/grpc_node/ext/call.o.d.raw   -c
Release/obj.target/grpc_node/ext/call.o: ../ext/call.cc \
 /root/.cache/node-gyp/18.17.1/include/node/node.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8.h \
 /root/.cache/node-gyp/18.17.1/include/node/cppgc/common.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8config.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-array-buffer.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-local-handle.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-internal.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-version.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8config.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-object.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-maybe.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-persistent-handle.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-weak-callback-info.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-primitive.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-data.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-value.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-traced-handle.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-container.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-context.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-snapshot.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-date.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-debug.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-script.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-message.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-exception.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-extension.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-external.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-function.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-function-callback.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-template.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-memory-span.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-initialization.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-callbacks.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-isolate.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-embedder-heap.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-microtask.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-statistics.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-promise.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-unwinder.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-embedder-state-scope.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-platform.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-json.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-locker.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-microtask-queue.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-primitive-object.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-proxy.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-regexp.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-typed-array.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-value-serializer.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8-wasm.h \
 /root/.cache/node-gyp/18.17.1/include/node/node_version.h \
 /root/.cache/node-gyp/18.17.1/include/node/node_api.h \
 /root/.cache/node-gyp/18.17.1/include/node/js_native_api.h \
 /root/.cache/node-gyp/18.17.1/include/node/js_native_api_types.h \
 /root/.cache/node-gyp/18.17.1/include/node/node_api_types.h \
 ../ext/byte_buffer.h ../../nan/nan.h \
 /root/.cache/node-gyp/18.17.1/include/node/node_version.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/errno.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/version.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/unix.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/threadpool.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/linux.h \
 /root/.cache/node-gyp/18.17.1/include/node/node_buffer.h \
 /root/.cache/node-gyp/18.17.1/include/node/node.h \
 /root/.cache/node-gyp/18.17.1/include/node/node_object_wrap.h \
 ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
 ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
 ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
 ../../nan/nan_implementation_12_inl.h ../../nan/nan_persistent_12_inl.h \
 ../../nan/nan_weak.h ../../nan/nan_object_wrap.h ../../nan/nan_private.h \
 ../../nan/nan_typedarray_contents.h ../../nan/nan_json.h \
 ../../nan/nan_scriptorigin.h ../deps/grpc/include/grpc/grpc.h \
 ../deps/grpc/include/grpc/support/port_platform.h \
 ../deps/grpc/include/grpc/impl/codegen/port_platform.h \
 ../deps/grpc/include/grpc/status.h \
 ../deps/grpc/include/grpc/impl/codegen/status.h \
 ../deps/grpc/include/grpc/byte_buffer.h \
 ../deps/grpc/include/grpc/impl/codegen/byte_buffer.h \
 ../deps/grpc/include/grpc/impl/codegen/grpc_types.h \
 ../deps/grpc/include/grpc/impl/codegen/compression_types.h \
 ../deps/grpc/include/grpc/impl/codegen/gpr_types.h \
 ../deps/grpc/include/grpc/impl/codegen/slice.h \
 ../deps/grpc/include/grpc/impl/codegen/gpr_slice.h \
 ../deps/grpc/include/grpc/slice_buffer.h \
 ../deps/grpc/include/grpc/slice.h \
 ../deps/grpc/include/grpc/support/sync.h \
 ../deps/grpc/include/grpc/impl/codegen/sync.h \
 ../deps/grpc/include/grpc/impl/codegen/sync_generic.h \
 ../deps/grpc/include/grpc/impl/codegen/atm.h \
 ../deps/grpc/include/grpc/impl/codegen/atm_gcc_atomic.h \
 ../deps/grpc/include/grpc/impl/codegen/sync_posix.h \
 ../deps/grpc/include/grpc/impl/codegen/connectivity_state.h \
 ../deps/grpc/include/grpc/impl/codegen/propagation_bits.h \
 ../deps/grpc/include/grpc/support/time.h ../ext/call.h \
 ../deps/grpc/include/grpc/support/log.h \
 ../deps/grpc/include/grpc/impl/codegen/log.h ../ext/channel.h \
 ../ext/call_credentials.h ../deps/grpc/include/grpc/grpc_security.h \
 ../deps/grpc/include/grpc/grpc_security_constants.h \
 ../ext/completion_queue.h \
 /root/.cache/node-gyp/18.17.1/include/node/v8.h \
 ../deps/grpc/include/grpc/support/alloc.h ../ext/slice.h \
 ../ext/timeval.h
../ext/call.cc:
/root/.cache/node-gyp/18.17.1/include/node/node.h:
/root/.cache/node-gyp/18.17.1/include/node/v8.h:
/root/.cache/node-gyp/18.17.1/include/node/cppgc/common.h:
/root/.cache/node-gyp/18.17.1/include/node/v8config.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-array-buffer.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-local-handle.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-internal.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-version.h:
/root/.cache/node-gyp/18.17.1/include/node/v8config.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-object.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-maybe.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-persistent-handle.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-weak-callback-info.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-primitive.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-data.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-value.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-traced-handle.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-container.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-context.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-snapshot.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-date.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-debug.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-script.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-message.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-exception.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-extension.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-external.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-function.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-function-callback.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-template.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-memory-span.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-initialization.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-callbacks.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-isolate.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-embedder-heap.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-microtask.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-statistics.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-promise.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-unwinder.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-embedder-state-scope.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-platform.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-json.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-locker.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-microtask-queue.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-primitive-object.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-proxy.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-regexp.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-typed-array.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-value-serializer.h:
/root/.cache/node-gyp/18.17.1/include/node/v8-wasm.h:
/root/.cache/node-gyp/18.17.1/include/node/node_version.h:
/root/.cache/node-gyp/18.17.1/include/node/node_api.h:
/root/.cache/node-gyp/18.17.1/include/node/js_native_api.h:
/root/.cache/node-gyp/18.17.1/include/node/js_native_api_types.h:
/root/.cache/node-gyp/18.17.1/include/node/node_api_types.h:
../ext/byte_buffer.h:
../../nan/nan.h:
/root/.cache/node-gyp/18.17.1/include/node/node_version.h:
/root/.cache/node-gyp/18.17.1/include/node/uv.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/errno.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/version.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/unix.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/threadpool.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/linux.h:
/root/.cache/node-gyp/18.17.1/include/node/node_buffer.h:
/root/.cache/node-gyp/18.17.1/include/node/node.h:
/root/.cache/node-gyp/18.17.1/include/node/node_object_wrap.h:
../../nan/nan_callbacks.h:
../../nan/nan_callbacks_12_inl.h:
../../nan/nan_maybe_43_inl.h:
../../nan/nan_converters.h:
../../nan/nan_converters_43_inl.h:
../../nan/nan_new.h:
../../nan/nan_implementation_12_inl.h:
../../nan/nan_persistent_12_inl.h:
../../nan/nan_weak.h:
../../nan/nan_object_wrap.h:
../../nan/nan_private.h:
../../nan/nan_typedarray_contents.h:
../../nan/nan_json.h:
../../nan/nan_scriptorigin.h:
../deps/grpc/include/grpc/grpc.h:
../deps/grpc/include/grpc/support/port_platform.h:
../deps/grpc/include/grpc/impl/codegen/port_platform.h:
../deps/grpc/include/grpc/status.h:
../deps/grpc/include/grpc/impl/codegen/status.h:
../deps/grpc/include/grpc/byte_buffer.h:
../deps/grpc/include/grpc/impl/codegen/byte_buffer.h:
../deps/grpc/include/grpc/impl/codegen/grpc_types.h:
../deps/grpc/include/grpc/impl/codegen/compression_types.h:
../deps/grpc/include/grpc/impl/codegen/gpr_types.h:
../deps/grpc/include/grpc/impl/codegen/slice.h:
../deps/grpc/include/grpc/impl/codegen/gpr_slice.h:
../deps/grpc/include/grpc/slice_buffer.h:
../deps/grpc/include/grpc/slice.h:
../deps/grpc/include/grpc/support/sync.h:
../deps/grpc/include/grpc/impl/codegen/sync.h:
../deps/grpc/include/grpc/impl/codegen/sync_generic.h:
../deps/grpc/include/grpc/impl/codegen/atm.h:
../deps/grpc/include/grpc/impl/codegen/atm_gcc_atomic.h:
../deps/grpc/include/grpc/impl/codegen/sync_posix.h:
../deps/grpc/include/grpc/impl/codegen/connectivity_state.h:
../deps/grpc/include/grpc/impl/codegen/propagation_bits.h:
../deps/grpc/include/grpc/support/time.h:
../ext/call.h:
../deps/grpc/include/grpc/support/log.h:
../deps/grpc/include/grpc/impl/codegen/log.h:
../ext/channel.h:
../ext/call_credentials.h:
../deps/grpc/include/grpc/grpc_security.h:
../deps/grpc/include/grpc/grpc_security_constants.h:
../ext/completion_queue.h:
/root/.cache/node-gyp/18.17.1/include/node/v8.h:
../deps/grpc/include/grpc/support/alloc.h:
../ext/slice.h:
../ext/timeval.h:
