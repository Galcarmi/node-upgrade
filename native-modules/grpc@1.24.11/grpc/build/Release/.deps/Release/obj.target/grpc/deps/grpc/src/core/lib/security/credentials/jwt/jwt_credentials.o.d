cmd_Release/obj.target/grpc/deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.o := g++ -o Release/obj.target/grpc/deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.o ../deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.cc '-DPB_FIELD_32BIT' '-DGPR_BACKWARDS_COMPATIBILITY_MODE' '-DGRPC_ARES=1' '-DGRPC_UV' '-DGRPC_NODE_VERSION="1.24.11"' '-DCARES_STATICLIB' '-DCARES_SYMBOL_HIDING' '-DNODE_GYP_MODULE_NAME=grpc' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-DTSI_OPENSSL_ALPN_SUPPORT=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DNDEBUG' -I../deps/grpc -I../deps/grpc/include -I../deps/grpc/src/core/ext/upb-generated -I../deps/grpc/third_party/abseil-cpp -I../deps/grpc/third_party/address_sorting/include -I../deps/grpc/third_party/cares -I../deps/grpc/third_party/cares/cares -I../deps/grpc/third_party/nanopb -I../deps/grpc/third_party/upb -I../deps/grpc/third_party/upb/generated_for_cmake -I/root/.cache/node-gyp/18.17.1/include/node -I/root/.cache/node-gyp/18.17.1/src -I/root/.cache/node-gyp/18.17.1/deps/openssl/config -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/uv/include -I/root/.cache/node-gyp/18.17.1/deps/zlib -I/root/.cache/node-gyp/18.17.1/deps/v8/include -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/openssl/config/k8 -I/root/.cache/node-gyp/18.17.1/deps/zlib  -g -Wall -Wextra -DOSATOMIC_USE_INLINED=1 -Ithird_party/upb -Isrc/core/ext/upb-generated -fvisibility=hidden -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O2 -Wframe-larger-than=16384 -O3 -fno-omit-frame-pointer -std=c++14 -fno-rtti -fno-exceptions -std=gnu++17 -MMD -MF ./Release/.deps/Release/obj.target/grpc/deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.o.d.raw   -c
Release/obj.target/grpc/deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.o: \
 ../deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.cc \
 ../deps/grpc/include/grpc/support/port_platform.h \
 ../deps/grpc/include/grpc/impl/codegen/port_platform.h \
 ../deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.h \
 ../deps/grpc/src/core/lib/security/credentials/credentials.h \
 ../deps/grpc/include/grpc/grpc.h ../deps/grpc/include/grpc/status.h \
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
 ../deps/grpc/include/grpc/support/time.h \
 ../deps/grpc/include/grpc/grpc_security.h \
 ../deps/grpc/include/grpc/grpc_security_constants.h \
 ../deps/grpc/src/core/lib/transport/metadata_batch.h \
 ../deps/grpc/src/core/lib/iomgr/exec_ctx.h \
 ../deps/grpc/include/grpc/support/atm.h \
 ../deps/grpc/include/grpc/support/cpu.h \
 ../deps/grpc/include/grpc/support/log.h \
 ../deps/grpc/include/grpc/impl/codegen/log.h \
 ../deps/grpc/src/core/lib/gpr/time_precise.h \
 ../deps/grpc/src/core/lib/gpr/tls.h \
 ../deps/grpc/src/core/lib/gpr/tls_gcc.h \
 ../deps/grpc/src/core/lib/gprpp/fork.h \
 ../deps/grpc/src/core/lib/gprpp/atomic.h \
 ../deps/grpc/src/core/lib/iomgr/closure.h \
 ../deps/grpc/include/grpc/support/alloc.h \
 ../deps/grpc/src/core/lib/gpr/mpscq.h \
 ../deps/grpc/src/core/lib/iomgr/error.h \
 ../deps/grpc/src/core/lib/debug/trace.h \
 ../deps/grpc/src/core/lib/gprpp/global_config.h \
 ../deps/grpc/src/core/lib/gprpp/global_config_env.h \
 ../deps/grpc/src/core/lib/gprpp/global_config_generic.h \
 ../deps/grpc/src/core/lib/gprpp/memory.h \
 ../deps/grpc/src/core/lib/gprpp/global_config_custom.h \
 ../deps/grpc/src/core/lib/gprpp/inlined_vector.h \
 ../deps/grpc/src/core/lib/profiling/timers.h \
 ../deps/grpc/src/core/lib/transport/metadata.h \
 ../deps/grpc/src/core/lib/gpr/useful.h \
 ../deps/grpc/src/core/lib/gprpp/sync.h \
 ../deps/grpc/src/core/lib/slice/slice_utils.h \
 ../deps/grpc/src/core/lib/transport/static_metadata.h \
 ../deps/grpc/src/core/lib/gprpp/map.h \
 ../deps/grpc/src/core/lib/gprpp/pair.h \
 ../deps/grpc/src/core/lib/gprpp/ref_counted_ptr.h \
 ../deps/grpc/src/core/lib/gprpp/debug_location.h \
 ../deps/grpc/src/core/lib/gprpp/string_view.h \
 ../deps/grpc/src/core/lib/gpr/string.h \
 ../deps/grpc/src/core/lib/gprpp/ref_counted.h \
 ../deps/grpc/src/core/lib/gprpp/abstract.h \
 ../deps/grpc/src/core/lib/http/httpcli.h \
 ../deps/grpc/src/core/lib/http/parser.h \
 ../deps/grpc/src/core/lib/iomgr/endpoint.h \
 ../deps/grpc/src/core/lib/iomgr/pollset.h \
 ../deps/grpc/src/core/lib/iomgr/pollset_set.h \
 ../deps/grpc/src/core/lib/iomgr/resource_quota.h \
 ../deps/grpc/src/core/lib/iomgr/iomgr_internal.h \
 ../deps/grpc/src/core/lib/iomgr/iomgr.h \
 ../deps/grpc/src/core/lib/iomgr/port.h \
 ../deps/grpc/src/core/lib/iomgr/polling_entity.h \
 ../deps/grpc/src/core/lib/security/security_connector/security_connector.h \
 ../deps/grpc/src/core/lib/channel/handshaker.h \
 ../deps/grpc/include/grpc/support/string_util.h \
 ../deps/grpc/src/core/lib/channel/channel_args.h \
 ../deps/grpc/src/core/lib/iomgr/tcp_server.h \
 ../deps/grpc/src/core/lib/iomgr/resolve_address.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/errno.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/version.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/unix.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/threadpool.h \
 /root/.cache/node-gyp/18.17.1/include/node/uv/linux.h \
 ../deps/grpc/src/core/lib/iomgr/timer.h \
 ../deps/grpc/src/core/tsi/ssl_transport_security.h \
 ../deps/grpc/src/core/tsi/transport_security_interface.h \
 ../deps/grpc/src/core/lib/security/credentials/jwt/json_token.h \
 ../deps/grpc/src/core/tsi/grpc_shadow_boringssl.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/rsa.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/macros.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/opensslconf.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/configuration.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/./configuration_asm.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/configuration.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/opensslv.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/./opensslv_asm.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/opensslv.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/asn1.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/./asn1_asm.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/asn1.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/e_os2.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/bio.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/./bio_asm.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/bio.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/crypto.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/./crypto_asm.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/crypto.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/safestack.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/./safestack_asm.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/safestack.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/stack.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/types.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/cryptoerr.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/symhacks.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/cryptoerr_legacy.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/core.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/bioerr.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/asn1err.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/bn.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/bnerr.h \
 /root/.cache/node-gyp/18.17.1/include/node/openssl/rsaerr.h \
 ../deps/grpc/src/core/lib/json/json.h \
 ../deps/grpc/src/core/lib/json/json_common.h \
 ../deps/grpc/src/core/lib/surface/api_trace.h
../deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.cc:
../deps/grpc/include/grpc/support/port_platform.h:
../deps/grpc/include/grpc/impl/codegen/port_platform.h:
../deps/grpc/src/core/lib/security/credentials/jwt/jwt_credentials.h:
../deps/grpc/src/core/lib/security/credentials/credentials.h:
../deps/grpc/include/grpc/grpc.h:
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
../deps/grpc/include/grpc/grpc_security.h:
../deps/grpc/include/grpc/grpc_security_constants.h:
../deps/grpc/src/core/lib/transport/metadata_batch.h:
../deps/grpc/src/core/lib/iomgr/exec_ctx.h:
../deps/grpc/include/grpc/support/atm.h:
../deps/grpc/include/grpc/support/cpu.h:
../deps/grpc/include/grpc/support/log.h:
../deps/grpc/include/grpc/impl/codegen/log.h:
../deps/grpc/src/core/lib/gpr/time_precise.h:
../deps/grpc/src/core/lib/gpr/tls.h:
../deps/grpc/src/core/lib/gpr/tls_gcc.h:
../deps/grpc/src/core/lib/gprpp/fork.h:
../deps/grpc/src/core/lib/gprpp/atomic.h:
../deps/grpc/src/core/lib/iomgr/closure.h:
../deps/grpc/include/grpc/support/alloc.h:
../deps/grpc/src/core/lib/gpr/mpscq.h:
../deps/grpc/src/core/lib/iomgr/error.h:
../deps/grpc/src/core/lib/debug/trace.h:
../deps/grpc/src/core/lib/gprpp/global_config.h:
../deps/grpc/src/core/lib/gprpp/global_config_env.h:
../deps/grpc/src/core/lib/gprpp/global_config_generic.h:
../deps/grpc/src/core/lib/gprpp/memory.h:
../deps/grpc/src/core/lib/gprpp/global_config_custom.h:
../deps/grpc/src/core/lib/gprpp/inlined_vector.h:
../deps/grpc/src/core/lib/profiling/timers.h:
../deps/grpc/src/core/lib/transport/metadata.h:
../deps/grpc/src/core/lib/gpr/useful.h:
../deps/grpc/src/core/lib/gprpp/sync.h:
../deps/grpc/src/core/lib/slice/slice_utils.h:
../deps/grpc/src/core/lib/transport/static_metadata.h:
../deps/grpc/src/core/lib/gprpp/map.h:
../deps/grpc/src/core/lib/gprpp/pair.h:
../deps/grpc/src/core/lib/gprpp/ref_counted_ptr.h:
../deps/grpc/src/core/lib/gprpp/debug_location.h:
../deps/grpc/src/core/lib/gprpp/string_view.h:
../deps/grpc/src/core/lib/gpr/string.h:
../deps/grpc/src/core/lib/gprpp/ref_counted.h:
../deps/grpc/src/core/lib/gprpp/abstract.h:
../deps/grpc/src/core/lib/http/httpcli.h:
../deps/grpc/src/core/lib/http/parser.h:
../deps/grpc/src/core/lib/iomgr/endpoint.h:
../deps/grpc/src/core/lib/iomgr/pollset.h:
../deps/grpc/src/core/lib/iomgr/pollset_set.h:
../deps/grpc/src/core/lib/iomgr/resource_quota.h:
../deps/grpc/src/core/lib/iomgr/iomgr_internal.h:
../deps/grpc/src/core/lib/iomgr/iomgr.h:
../deps/grpc/src/core/lib/iomgr/port.h:
../deps/grpc/src/core/lib/iomgr/polling_entity.h:
../deps/grpc/src/core/lib/security/security_connector/security_connector.h:
../deps/grpc/src/core/lib/channel/handshaker.h:
../deps/grpc/include/grpc/support/string_util.h:
../deps/grpc/src/core/lib/channel/channel_args.h:
../deps/grpc/src/core/lib/iomgr/tcp_server.h:
../deps/grpc/src/core/lib/iomgr/resolve_address.h:
/root/.cache/node-gyp/18.17.1/include/node/uv.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/errno.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/version.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/unix.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/threadpool.h:
/root/.cache/node-gyp/18.17.1/include/node/uv/linux.h:
../deps/grpc/src/core/lib/iomgr/timer.h:
../deps/grpc/src/core/tsi/ssl_transport_security.h:
../deps/grpc/src/core/tsi/transport_security_interface.h:
../deps/grpc/src/core/lib/security/credentials/jwt/json_token.h:
../deps/grpc/src/core/tsi/grpc_shadow_boringssl.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/rsa.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/macros.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/opensslconf.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/configuration.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/./configuration_asm.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/configuration.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/opensslv.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/./opensslv_asm.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/opensslv.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/asn1.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/./asn1_asm.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/asn1.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/e_os2.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/bio.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/./bio_asm.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/bio.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/crypto.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/./crypto_asm.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/crypto.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/safestack.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/./safestack_asm.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/safestack.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/stack.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/types.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/cryptoerr.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/symhacks.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/cryptoerr_legacy.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/core.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/bioerr.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/asn1err.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/bn.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/bnerr.h:
/root/.cache/node-gyp/18.17.1/include/node/openssl/rsaerr.h:
../deps/grpc/src/core/lib/json/json.h:
../deps/grpc/src/core/lib/json/json_common.h:
../deps/grpc/src/core/lib/surface/api_trace.h:
