cmd_Release/obj.target/grpc/deps/grpc/src/core/lib/iomgr/tcp_server_custom.o := g++ -o Release/obj.target/grpc/deps/grpc/src/core/lib/iomgr/tcp_server_custom.o ../deps/grpc/src/core/lib/iomgr/tcp_server_custom.cc '-DPB_FIELD_32BIT' '-DGPR_BACKWARDS_COMPATIBILITY_MODE' '-DGRPC_ARES=1' '-DGRPC_UV' '-DGRPC_NODE_VERSION="1.24.2"' '-DCARES_STATICLIB' '-DCARES_SYMBOL_HIDING' '-DNODE_GYP_MODULE_NAME=grpc' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-DTSI_OPENSSL_ALPN_SUPPORT=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DNDEBUG' -I../deps/grpc -I../deps/grpc/include -I../deps/grpc/src/core/ext/upb-generated -I../deps/grpc/third_party/abseil-cpp -I../deps/grpc/third_party/address_sorting/include -I../deps/grpc/third_party/cares -I../deps/grpc/third_party/cares/cares -I../deps/grpc/third_party/nanopb -I../deps/grpc/third_party/upb -I../deps/grpc/third_party/upb/generated_for_cmake -I/root/.cache/node-gyp/18.17.1/include/node -I/root/.cache/node-gyp/18.17.1/src -I/root/.cache/node-gyp/18.17.1/deps/openssl/config -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/uv/include -I/root/.cache/node-gyp/18.17.1/deps/zlib -I/root/.cache/node-gyp/18.17.1/deps/v8/include -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/openssl/config/k8 -I/root/.cache/node-gyp/18.17.1/deps/zlib  -g -Wall -Wextra -DOSATOMIC_USE_INLINED=1 -Ithird_party/upb -Isrc/core/ext/upb-generated -fvisibility=hidden -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O2 -Wframe-larger-than=16384 -O3 -fno-omit-frame-pointer -std=c++1y -fno-rtti -fno-exceptions -std=gnu++17 -MMD -MF ./Release/.deps/Release/obj.target/grpc/deps/grpc/src/core/lib/iomgr/tcp_server_custom.o.d.raw   -c
Release/obj.target/grpc/deps/grpc/src/core/lib/iomgr/tcp_server_custom.o: \
 ../deps/grpc/src/core/lib/iomgr/tcp_server_custom.cc \
 ../deps/grpc/include/grpc/support/port_platform.h \
 ../deps/grpc/include/grpc/impl/codegen/port_platform.h \
 ../deps/grpc/src/core/lib/iomgr/port.h \
 ../deps/grpc/include/grpc/support/alloc.h \
 ../deps/grpc/include/grpc/support/log.h \
 ../deps/grpc/include/grpc/impl/codegen/log.h \
 ../deps/grpc/src/core/lib/iomgr/error.h \
 ../deps/grpc/include/grpc/slice.h \
 ../deps/grpc/include/grpc/impl/codegen/slice.h \
 ../deps/grpc/include/grpc/impl/codegen/gpr_slice.h \
 ../deps/grpc/include/grpc/support/sync.h \
 ../deps/grpc/include/grpc/impl/codegen/gpr_types.h \
 ../deps/grpc/include/grpc/impl/codegen/sync.h \
 ../deps/grpc/include/grpc/impl/codegen/sync_generic.h \
 ../deps/grpc/include/grpc/impl/codegen/atm.h \
 ../deps/grpc/include/grpc/impl/codegen/atm_gcc_atomic.h \
 ../deps/grpc/include/grpc/impl/codegen/sync_posix.h \
 ../deps/grpc/include/grpc/status.h \
 ../deps/grpc/include/grpc/impl/codegen/status.h \
 ../deps/grpc/include/grpc/support/time.h \
 ../deps/grpc/src/core/lib/debug/trace.h \
 ../deps/grpc/include/grpc/support/atm.h \
 ../deps/grpc/src/core/lib/gprpp/global_config.h \
 ../deps/grpc/src/core/lib/gprpp/global_config_env.h \
 ../deps/grpc/src/core/lib/gprpp/global_config_generic.h \
 ../deps/grpc/src/core/lib/gprpp/memory.h \
 ../deps/grpc/src/core/lib/gprpp/global_config_custom.h \
 ../deps/grpc/src/core/lib/gprpp/inlined_vector.h \
 ../deps/grpc/src/core/lib/iomgr/exec_ctx.h \
 ../deps/grpc/include/grpc/impl/codegen/grpc_types.h \
 ../deps/grpc/include/grpc/impl/codegen/compression_types.h \
 ../deps/grpc/include/grpc/support/cpu.h \
 ../deps/grpc/src/core/lib/gpr/time_precise.h \
 ../deps/grpc/src/core/lib/gpr/tls.h \
 ../deps/grpc/src/core/lib/gpr/tls_gcc.h \
 ../deps/grpc/src/core/lib/gprpp/fork.h \
 ../deps/grpc/src/core/lib/gprpp/atomic.h \
 ../deps/grpc/src/core/lib/iomgr/closure.h \
 ../deps/grpc/src/core/lib/gpr/mpscq.h \
 ../deps/grpc/src/core/lib/profiling/timers.h \
 ../deps/grpc/src/core/lib/iomgr/iomgr_custom.h \
 ../deps/grpc/src/core/lib/iomgr/pollset_custom.h \
 ../deps/grpc/src/core/lib/iomgr/resolve_address_custom.h \
 ../deps/grpc/src/core/lib/iomgr/resolve_address.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/errno.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/version.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/unix.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/threadpool.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/linux.h \
 ../deps/grpc/src/core/lib/iomgr/pollset_set.h \
 ../deps/grpc/src/core/lib/iomgr/pollset.h \
 ../deps/grpc/src/core/lib/iomgr/sockaddr.h \
 ../deps/grpc/src/core/lib/iomgr/sockaddr_custom.h \
 ../deps/grpc/src/core/lib/iomgr/sockaddr_posix.h \
 ../deps/grpc/src/core/lib/iomgr/sockaddr_windows.h \
 ../deps/grpc/src/core/lib/iomgr/tcp_custom.h \
 ../deps/grpc/src/core/lib/iomgr/endpoint.h \
 ../deps/grpc/include/grpc/slice_buffer.h \
 ../deps/grpc/src/core/lib/iomgr/resource_quota.h \
 ../deps/grpc/include/grpc/grpc.h ../deps/grpc/include/grpc/byte_buffer.h \
 ../deps/grpc/include/grpc/impl/codegen/byte_buffer.h \
 ../deps/grpc/include/grpc/impl/codegen/connectivity_state.h \
 ../deps/grpc/include/grpc/impl/codegen/propagation_bits.h \
 ../deps/grpc/src/core/lib/iomgr/timer_custom.h \
 ../deps/grpc/src/core/lib/iomgr/timer.h \
 ../deps/grpc/src/core/lib/iomgr/iomgr.h \
 ../deps/grpc/include/grpc/support/thd_id.h \
 ../deps/grpc/src/core/lib/iomgr/sockaddr_utils.h \
 ../deps/grpc/src/core/lib/iomgr/tcp_server.h \
 ../deps/grpc/src/core/lib/gprpp/abstract.h
../deps/grpc/src/core/lib/iomgr/tcp_server_custom.cc:
../deps/grpc/include/grpc/support/port_platform.h:
../deps/grpc/include/grpc/impl/codegen/port_platform.h:
../deps/grpc/src/core/lib/iomgr/port.h:
../deps/grpc/include/grpc/support/alloc.h:
../deps/grpc/include/grpc/support/log.h:
../deps/grpc/include/grpc/impl/codegen/log.h:
../deps/grpc/src/core/lib/iomgr/error.h:
../deps/grpc/include/grpc/slice.h:
../deps/grpc/include/grpc/impl/codegen/slice.h:
../deps/grpc/include/grpc/impl/codegen/gpr_slice.h:
../deps/grpc/include/grpc/support/sync.h:
../deps/grpc/include/grpc/impl/codegen/gpr_types.h:
../deps/grpc/include/grpc/impl/codegen/sync.h:
../deps/grpc/include/grpc/impl/codegen/sync_generic.h:
../deps/grpc/include/grpc/impl/codegen/atm.h:
../deps/grpc/include/grpc/impl/codegen/atm_gcc_atomic.h:
../deps/grpc/include/grpc/impl/codegen/sync_posix.h:
../deps/grpc/include/grpc/status.h:
../deps/grpc/include/grpc/impl/codegen/status.h:
../deps/grpc/include/grpc/support/time.h:
../deps/grpc/src/core/lib/debug/trace.h:
../deps/grpc/include/grpc/support/atm.h:
../deps/grpc/src/core/lib/gprpp/global_config.h:
../deps/grpc/src/core/lib/gprpp/global_config_env.h:
../deps/grpc/src/core/lib/gprpp/global_config_generic.h:
../deps/grpc/src/core/lib/gprpp/memory.h:
../deps/grpc/src/core/lib/gprpp/global_config_custom.h:
../deps/grpc/src/core/lib/gprpp/inlined_vector.h:
../deps/grpc/src/core/lib/iomgr/exec_ctx.h:
../deps/grpc/include/grpc/impl/codegen/grpc_types.h:
../deps/grpc/include/grpc/impl/codegen/compression_types.h:
../deps/grpc/include/grpc/support/cpu.h:
../deps/grpc/src/core/lib/gpr/time_precise.h:
../deps/grpc/src/core/lib/gpr/tls.h:
../deps/grpc/src/core/lib/gpr/tls_gcc.h:
../deps/grpc/src/core/lib/gprpp/fork.h:
../deps/grpc/src/core/lib/gprpp/atomic.h:
../deps/grpc/src/core/lib/iomgr/closure.h:
../deps/grpc/src/core/lib/gpr/mpscq.h:
../deps/grpc/src/core/lib/profiling/timers.h:
../deps/grpc/src/core/lib/iomgr/iomgr_custom.h:
../deps/grpc/src/core/lib/iomgr/pollset_custom.h:
../deps/grpc/src/core/lib/iomgr/resolve_address_custom.h:
../deps/grpc/src/core/lib/iomgr/resolve_address.h:
/root/.cache/node-gyp/18.17.1/include/node/uv.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/errno.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/version.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/unix.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/threadpool.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/linux.h:
../deps/grpc/src/core/lib/iomgr/pollset_set.h:
../deps/grpc/src/core/lib/iomgr/pollset.h:
../deps/grpc/src/core/lib/iomgr/sockaddr.h:
../deps/grpc/src/core/lib/iomgr/sockaddr_custom.h:
../deps/grpc/src/core/lib/iomgr/sockaddr_posix.h:
../deps/grpc/src/core/lib/iomgr/sockaddr_windows.h:
../deps/grpc/src/core/lib/iomgr/tcp_custom.h:
../deps/grpc/src/core/lib/iomgr/endpoint.h:
../deps/grpc/include/grpc/slice_buffer.h:
../deps/grpc/src/core/lib/iomgr/resource_quota.h:
../deps/grpc/include/grpc/grpc.h:
../deps/grpc/include/grpc/byte_buffer.h:
../deps/grpc/include/grpc/impl/codegen/byte_buffer.h:
../deps/grpc/include/grpc/impl/codegen/connectivity_state.h:
../deps/grpc/include/grpc/impl/codegen/propagation_bits.h:
../deps/grpc/src/core/lib/iomgr/timer_custom.h:
../deps/grpc/src/core/lib/iomgr/timer.h:
../deps/grpc/src/core/lib/iomgr/iomgr.h:
../deps/grpc/include/grpc/support/thd_id.h:
../deps/grpc/src/core/lib/iomgr/sockaddr_utils.h:
../deps/grpc/src/core/lib/iomgr/tcp_server.h:
../deps/grpc/src/core/lib/gprpp/abstract.h:
