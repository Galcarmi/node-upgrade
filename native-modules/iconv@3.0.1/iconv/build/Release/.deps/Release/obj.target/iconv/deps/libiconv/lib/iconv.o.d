cmd_Release/obj.target/iconv/deps/libiconv/lib/iconv.o := cc -o Release/obj.target/iconv/deps/libiconv/lib/iconv.o ../deps/libiconv/lib/iconv.c '-DNODE_GYP_MODULE_NAME=iconv' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DICONV_CONST=const' '-DENABLE_EXTRA=1' '-DBUILDING_NODE_EXTENSION' -I/root/.cache/node-gyp/18.17.1/include/node -I/root/.cache/node-gyp/18.17.1/src -I/root/.cache/node-gyp/18.17.1/deps/openssl/config -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/uv/include -I/root/.cache/node-gyp/18.17.1/deps/zlib -I/root/.cache/node-gyp/18.17.1/deps/v8/include -I../support  -fPIC -pthread -Wno-unused-parameter -m64 -O3 -fno-omit-frame-pointer  -MMD -MF ./Release/.deps/Release/obj.target/iconv/deps/libiconv/lib/iconv.o.d.raw   -c
Release/obj.target/iconv/deps/libiconv/lib/iconv.o: \
 ../deps/libiconv/lib/iconv.c ../support/iconv.h ../support/config.h \
 ../support/localcharset.h ../deps/libiconv/lib/converters.h \
 ../deps/libiconv/lib/ascii.h ../deps/libiconv/lib/utf8.h \
 ../deps/libiconv/lib/ucs2.h ../deps/libiconv/lib/ucs2be.h \
 ../deps/libiconv/lib/ucs2le.h ../deps/libiconv/lib/ucs4.h \
 ../deps/libiconv/lib/ucs4be.h ../deps/libiconv/lib/ucs4le.h \
 ../deps/libiconv/lib/utf16.h ../deps/libiconv/lib/utf16be.h \
 ../deps/libiconv/lib/utf16le.h ../deps/libiconv/lib/utf32.h \
 ../deps/libiconv/lib/utf32be.h ../deps/libiconv/lib/utf32le.h \
 ../deps/libiconv/lib/utf7.h ../deps/libiconv/lib/ucs2internal.h \
 ../deps/libiconv/lib/ucs2swapped.h ../deps/libiconv/lib/ucs4internal.h \
 ../deps/libiconv/lib/ucs4swapped.h ../deps/libiconv/lib/c99.h \
 ../deps/libiconv/lib/java.h ../deps/libiconv/lib/iso8859_1.h \
 ../deps/libiconv/lib/iso8859_2.h ../deps/libiconv/lib/iso8859_3.h \
 ../deps/libiconv/lib/iso8859_4.h ../deps/libiconv/lib/iso8859_5.h \
 ../deps/libiconv/lib/iso8859_6.h ../deps/libiconv/lib/iso8859_7.h \
 ../deps/libiconv/lib/iso8859_8.h ../deps/libiconv/lib/iso8859_9.h \
 ../deps/libiconv/lib/iso8859_10.h ../deps/libiconv/lib/iso8859_11.h \
 ../deps/libiconv/lib/iso8859_13.h ../deps/libiconv/lib/iso8859_14.h \
 ../deps/libiconv/lib/iso8859_15.h ../deps/libiconv/lib/iso8859_16.h \
 ../deps/libiconv/lib/koi8_r.h ../deps/libiconv/lib/koi8_u.h \
 ../deps/libiconv/lib/koi8_ru.h ../deps/libiconv/lib/cp1250.h \
 ../deps/libiconv/lib/cp1251.h ../deps/libiconv/lib/cp1252.h \
 ../deps/libiconv/lib/cp1253.h ../deps/libiconv/lib/cp1254.h \
 ../deps/libiconv/lib/cp1255.h ../deps/libiconv/lib/flushwc.h \
 ../deps/libiconv/lib/cp1256.h ../deps/libiconv/lib/cp1257.h \
 ../deps/libiconv/lib/cp1258.h ../deps/libiconv/lib/vietcomb.h \
 ../deps/libiconv/lib/cp850.h ../deps/libiconv/lib/cp862.h \
 ../deps/libiconv/lib/cp866.h ../deps/libiconv/lib/cp1131.h \
 ../deps/libiconv/lib/mac_roman.h \
 ../deps/libiconv/lib/mac_centraleurope.h \
 ../deps/libiconv/lib/mac_iceland.h ../deps/libiconv/lib/mac_croatian.h \
 ../deps/libiconv/lib/mac_romania.h ../deps/libiconv/lib/mac_cyrillic.h \
 ../deps/libiconv/lib/mac_ukraine.h ../deps/libiconv/lib/mac_greek.h \
 ../deps/libiconv/lib/mac_turkish.h ../deps/libiconv/lib/mac_hebrew.h \
 ../deps/libiconv/lib/mac_arabic.h ../deps/libiconv/lib/mac_thai.h \
 ../deps/libiconv/lib/hp_roman8.h ../deps/libiconv/lib/nextstep.h \
 ../deps/libiconv/lib/armscii_8.h ../deps/libiconv/lib/georgian_academy.h \
 ../deps/libiconv/lib/georgian_ps.h ../deps/libiconv/lib/koi8_t.h \
 ../deps/libiconv/lib/pt154.h ../deps/libiconv/lib/rk1048.h \
 ../deps/libiconv/lib/mulelao.h ../deps/libiconv/lib/cp1133.h \
 ../deps/libiconv/lib/tis620.h ../deps/libiconv/lib/cp874.h \
 ../deps/libiconv/lib/viscii.h ../deps/libiconv/lib/tcvn.h \
 ../deps/libiconv/lib/iso646_jp.h ../deps/libiconv/lib/jisx0201.h \
 ../deps/libiconv/lib/jisx0208.h ../deps/libiconv/lib/jisx0212.h \
 ../deps/libiconv/lib/iso646_cn.h ../deps/libiconv/lib/gb2312.h \
 ../deps/libiconv/lib/isoir165.h ../deps/libiconv/lib/isoir165ext.h \
 ../deps/libiconv/lib/gbk.h ../deps/libiconv/lib/gbkext1.h \
 ../deps/libiconv/lib/gbkext2.h ../deps/libiconv/lib/gbkext_inv.h \
 ../deps/libiconv/lib/cp936ext.h ../deps/libiconv/lib/cns11643.h \
 ../deps/libiconv/lib/cns11643_1.h ../deps/libiconv/lib/cns11643_2.h \
 ../deps/libiconv/lib/cns11643_3.h ../deps/libiconv/lib/cns11643_4.h \
 ../deps/libiconv/lib/cns11643_4a.h ../deps/libiconv/lib/cns11643_4b.h \
 ../deps/libiconv/lib/cns11643_5.h ../deps/libiconv/lib/cns11643_6.h \
 ../deps/libiconv/lib/cns11643_7.h ../deps/libiconv/lib/cns11643_15.h \
 ../deps/libiconv/lib/cns11643_inv.h ../deps/libiconv/lib/big5.h \
 ../deps/libiconv/lib/ksc5601.h ../deps/libiconv/lib/johab_hangul.h \
 ../deps/libiconv/lib/euc_jp.h ../deps/libiconv/lib/sjis.h \
 ../deps/libiconv/lib/cp932.h ../deps/libiconv/lib/cp932ext.h \
 ../deps/libiconv/lib/iso2022_jp.h ../deps/libiconv/lib/iso2022_jp1.h \
 ../deps/libiconv/lib/iso2022_jp2.h ../deps/libiconv/lib/iso2022_jpms.h \
 ../deps/libiconv/lib/cp50221_0208_ext.h \
 ../deps/libiconv/lib/cp50221_0212_ext.h ../deps/libiconv/lib/euc_cn.h \
 ../deps/libiconv/lib/ces_gbk.h ../deps/libiconv/lib/cp936.h \
 ../deps/libiconv/lib/gb18030.h ../deps/libiconv/lib/gb18030ext.h \
 ../deps/libiconv/lib/gb18030uni.h ../deps/libiconv/lib/iso2022_cn.h \
 ../deps/libiconv/lib/iso2022_cnext.h ../deps/libiconv/lib/hz.h \
 ../deps/libiconv/lib/euc_tw.h ../deps/libiconv/lib/ces_big5.h \
 ../deps/libiconv/lib/cp950.h ../deps/libiconv/lib/cp950ext.h \
 ../deps/libiconv/lib/big5hkscs1999.h ../deps/libiconv/lib/hkscs1999.h \
 ../deps/libiconv/lib/big5hkscs2001.h ../deps/libiconv/lib/hkscs2001.h \
 ../deps/libiconv/lib/big5hkscs2004.h ../deps/libiconv/lib/hkscs2004.h \
 ../deps/libiconv/lib/big5hkscs2008.h ../deps/libiconv/lib/hkscs2008.h \
 ../deps/libiconv/lib/euc_kr.h ../deps/libiconv/lib/cp949.h \
 ../deps/libiconv/lib/uhc_1.h ../deps/libiconv/lib/uhc_2.h \
 ../deps/libiconv/lib/johab.h ../deps/libiconv/lib/iso2022_kr.h \
 ../deps/libiconv/lib/cp856.h ../deps/libiconv/lib/cp922.h \
 ../deps/libiconv/lib/cp943.h ../deps/libiconv/lib/cp1046.h \
 ../deps/libiconv/lib/cp1124.h ../deps/libiconv/lib/cp1129.h \
 ../deps/libiconv/lib/cp1161.h ../deps/libiconv/lib/cp1162.h \
 ../deps/libiconv/lib/cp1163.h ../deps/libiconv/lib/dec_kanji.h \
 ../deps/libiconv/lib/dec_hanyu.h ../deps/libiconv/lib/cp437.h \
 ../deps/libiconv/lib/cp737.h ../deps/libiconv/lib/cp775.h \
 ../deps/libiconv/lib/cp852.h ../deps/libiconv/lib/cp853.h \
 ../deps/libiconv/lib/cp855.h ../deps/libiconv/lib/cp857.h \
 ../deps/libiconv/lib/cp858.h ../deps/libiconv/lib/cp860.h \
 ../deps/libiconv/lib/cp861.h ../deps/libiconv/lib/cp863.h \
 ../deps/libiconv/lib/cp864.h ../deps/libiconv/lib/cp865.h \
 ../deps/libiconv/lib/cp869.h ../deps/libiconv/lib/cp1125.h \
 ../deps/libiconv/lib/euc_jisx0213.h ../deps/libiconv/lib/jisx0213.h \
 ../deps/libiconv/lib/shift_jisx0213.h ../deps/libiconv/lib/iso2022_jp3.h \
 ../deps/libiconv/lib/big5_2003.h ../deps/libiconv/lib/tds565.h \
 ../deps/libiconv/lib/atarist.h ../deps/libiconv/lib/riscos1.h \
 ../deps/libiconv/lib/cjk_variants.h ../deps/libiconv/lib/translit.h \
 ../deps/libiconv/lib/encodings.def \
 ../deps/libiconv/lib/encodings_aix.def \
 ../deps/libiconv/lib/encodings_osf1.def \
 ../deps/libiconv/lib/encodings_dos.def \
 ../deps/libiconv/lib/encodings_extra.def \
 ../deps/libiconv/lib/encodings_local.def ../deps/libiconv/lib/flags.h \
 ../deps/libiconv/lib/loops.h ../deps/libiconv/lib/loop_unicode.h \
 ../deps/libiconv/lib/loop_wchar.h ../deps/libiconv/lib/aliases.h \
 ../deps/libiconv/lib/aliases2.h ../deps/libiconv/lib/aliases_aix.h \
 ../deps/libiconv/lib/aliases_osf1.h ../deps/libiconv/lib/aliases_dos.h \
 ../deps/libiconv/lib/aliases_extra.h ../deps/libiconv/lib/iconv_open1.h \
 ../deps/libiconv/lib/iconv_open2.h ../deps/libiconv/lib/canonical.h \
 ../deps/libiconv/lib/canonical_aix.h \
 ../deps/libiconv/lib/canonical_osf1.h \
 ../deps/libiconv/lib/canonical_dos.h \
 ../deps/libiconv/lib/canonical_extra.h \
 ../deps/libiconv/lib/canonical_local.h
../deps/libiconv/lib/iconv.c:
../support/iconv.h:
../support/config.h:
../support/localcharset.h:
../deps/libiconv/lib/converters.h:
../deps/libiconv/lib/ascii.h:
../deps/libiconv/lib/utf8.h:
../deps/libiconv/lib/ucs2.h:
../deps/libiconv/lib/ucs2be.h:
../deps/libiconv/lib/ucs2le.h:
../deps/libiconv/lib/ucs4.h:
../deps/libiconv/lib/ucs4be.h:
../deps/libiconv/lib/ucs4le.h:
../deps/libiconv/lib/utf16.h:
../deps/libiconv/lib/utf16be.h:
../deps/libiconv/lib/utf16le.h:
../deps/libiconv/lib/utf32.h:
../deps/libiconv/lib/utf32be.h:
../deps/libiconv/lib/utf32le.h:
../deps/libiconv/lib/utf7.h:
../deps/libiconv/lib/ucs2internal.h:
../deps/libiconv/lib/ucs2swapped.h:
../deps/libiconv/lib/ucs4internal.h:
../deps/libiconv/lib/ucs4swapped.h:
../deps/libiconv/lib/c99.h:
../deps/libiconv/lib/java.h:
../deps/libiconv/lib/iso8859_1.h:
../deps/libiconv/lib/iso8859_2.h:
../deps/libiconv/lib/iso8859_3.h:
../deps/libiconv/lib/iso8859_4.h:
../deps/libiconv/lib/iso8859_5.h:
../deps/libiconv/lib/iso8859_6.h:
../deps/libiconv/lib/iso8859_7.h:
../deps/libiconv/lib/iso8859_8.h:
../deps/libiconv/lib/iso8859_9.h:
../deps/libiconv/lib/iso8859_10.h:
../deps/libiconv/lib/iso8859_11.h:
../deps/libiconv/lib/iso8859_13.h:
../deps/libiconv/lib/iso8859_14.h:
../deps/libiconv/lib/iso8859_15.h:
../deps/libiconv/lib/iso8859_16.h:
../deps/libiconv/lib/koi8_r.h:
../deps/libiconv/lib/koi8_u.h:
../deps/libiconv/lib/koi8_ru.h:
../deps/libiconv/lib/cp1250.h:
../deps/libiconv/lib/cp1251.h:
../deps/libiconv/lib/cp1252.h:
../deps/libiconv/lib/cp1253.h:
../deps/libiconv/lib/cp1254.h:
../deps/libiconv/lib/cp1255.h:
../deps/libiconv/lib/flushwc.h:
../deps/libiconv/lib/cp1256.h:
../deps/libiconv/lib/cp1257.h:
../deps/libiconv/lib/cp1258.h:
../deps/libiconv/lib/vietcomb.h:
../deps/libiconv/lib/cp850.h:
../deps/libiconv/lib/cp862.h:
../deps/libiconv/lib/cp866.h:
../deps/libiconv/lib/cp1131.h:
../deps/libiconv/lib/mac_roman.h:
../deps/libiconv/lib/mac_centraleurope.h:
../deps/libiconv/lib/mac_iceland.h:
../deps/libiconv/lib/mac_croatian.h:
../deps/libiconv/lib/mac_romania.h:
../deps/libiconv/lib/mac_cyrillic.h:
../deps/libiconv/lib/mac_ukraine.h:
../deps/libiconv/lib/mac_greek.h:
../deps/libiconv/lib/mac_turkish.h:
../deps/libiconv/lib/mac_hebrew.h:
../deps/libiconv/lib/mac_arabic.h:
../deps/libiconv/lib/mac_thai.h:
../deps/libiconv/lib/hp_roman8.h:
../deps/libiconv/lib/nextstep.h:
../deps/libiconv/lib/armscii_8.h:
../deps/libiconv/lib/georgian_academy.h:
../deps/libiconv/lib/georgian_ps.h:
../deps/libiconv/lib/koi8_t.h:
../deps/libiconv/lib/pt154.h:
../deps/libiconv/lib/rk1048.h:
../deps/libiconv/lib/mulelao.h:
../deps/libiconv/lib/cp1133.h:
../deps/libiconv/lib/tis620.h:
../deps/libiconv/lib/cp874.h:
../deps/libiconv/lib/viscii.h:
../deps/libiconv/lib/tcvn.h:
../deps/libiconv/lib/iso646_jp.h:
../deps/libiconv/lib/jisx0201.h:
../deps/libiconv/lib/jisx0208.h:
../deps/libiconv/lib/jisx0212.h:
../deps/libiconv/lib/iso646_cn.h:
../deps/libiconv/lib/gb2312.h:
../deps/libiconv/lib/isoir165.h:
../deps/libiconv/lib/isoir165ext.h:
../deps/libiconv/lib/gbk.h:
../deps/libiconv/lib/gbkext1.h:
../deps/libiconv/lib/gbkext2.h:
../deps/libiconv/lib/gbkext_inv.h:
../deps/libiconv/lib/cp936ext.h:
../deps/libiconv/lib/cns11643.h:
../deps/libiconv/lib/cns11643_1.h:
../deps/libiconv/lib/cns11643_2.h:
../deps/libiconv/lib/cns11643_3.h:
../deps/libiconv/lib/cns11643_4.h:
../deps/libiconv/lib/cns11643_4a.h:
../deps/libiconv/lib/cns11643_4b.h:
../deps/libiconv/lib/cns11643_5.h:
../deps/libiconv/lib/cns11643_6.h:
../deps/libiconv/lib/cns11643_7.h:
../deps/libiconv/lib/cns11643_15.h:
../deps/libiconv/lib/cns11643_inv.h:
../deps/libiconv/lib/big5.h:
../deps/libiconv/lib/ksc5601.h:
../deps/libiconv/lib/johab_hangul.h:
../deps/libiconv/lib/euc_jp.h:
../deps/libiconv/lib/sjis.h:
../deps/libiconv/lib/cp932.h:
../deps/libiconv/lib/cp932ext.h:
../deps/libiconv/lib/iso2022_jp.h:
../deps/libiconv/lib/iso2022_jp1.h:
../deps/libiconv/lib/iso2022_jp2.h:
../deps/libiconv/lib/iso2022_jpms.h:
../deps/libiconv/lib/cp50221_0208_ext.h:
../deps/libiconv/lib/cp50221_0212_ext.h:
../deps/libiconv/lib/euc_cn.h:
../deps/libiconv/lib/ces_gbk.h:
../deps/libiconv/lib/cp936.h:
../deps/libiconv/lib/gb18030.h:
../deps/libiconv/lib/gb18030ext.h:
../deps/libiconv/lib/gb18030uni.h:
../deps/libiconv/lib/iso2022_cn.h:
../deps/libiconv/lib/iso2022_cnext.h:
../deps/libiconv/lib/hz.h:
../deps/libiconv/lib/euc_tw.h:
../deps/libiconv/lib/ces_big5.h:
../deps/libiconv/lib/cp950.h:
../deps/libiconv/lib/cp950ext.h:
../deps/libiconv/lib/big5hkscs1999.h:
../deps/libiconv/lib/hkscs1999.h:
../deps/libiconv/lib/big5hkscs2001.h:
../deps/libiconv/lib/hkscs2001.h:
../deps/libiconv/lib/big5hkscs2004.h:
../deps/libiconv/lib/hkscs2004.h:
../deps/libiconv/lib/big5hkscs2008.h:
../deps/libiconv/lib/hkscs2008.h:
../deps/libiconv/lib/euc_kr.h:
../deps/libiconv/lib/cp949.h:
../deps/libiconv/lib/uhc_1.h:
../deps/libiconv/lib/uhc_2.h:
../deps/libiconv/lib/johab.h:
../deps/libiconv/lib/iso2022_kr.h:
../deps/libiconv/lib/cp856.h:
../deps/libiconv/lib/cp922.h:
../deps/libiconv/lib/cp943.h:
../deps/libiconv/lib/cp1046.h:
../deps/libiconv/lib/cp1124.h:
../deps/libiconv/lib/cp1129.h:
../deps/libiconv/lib/cp1161.h:
../deps/libiconv/lib/cp1162.h:
../deps/libiconv/lib/cp1163.h:
../deps/libiconv/lib/dec_kanji.h:
../deps/libiconv/lib/dec_hanyu.h:
../deps/libiconv/lib/cp437.h:
../deps/libiconv/lib/cp737.h:
../deps/libiconv/lib/cp775.h:
../deps/libiconv/lib/cp852.h:
../deps/libiconv/lib/cp853.h:
../deps/libiconv/lib/cp855.h:
../deps/libiconv/lib/cp857.h:
../deps/libiconv/lib/cp858.h:
../deps/libiconv/lib/cp860.h:
../deps/libiconv/lib/cp861.h:
../deps/libiconv/lib/cp863.h:
../deps/libiconv/lib/cp864.h:
../deps/libiconv/lib/cp865.h:
../deps/libiconv/lib/cp869.h:
../deps/libiconv/lib/cp1125.h:
../deps/libiconv/lib/euc_jisx0213.h:
../deps/libiconv/lib/jisx0213.h:
../deps/libiconv/lib/shift_jisx0213.h:
../deps/libiconv/lib/iso2022_jp3.h:
../deps/libiconv/lib/big5_2003.h:
../deps/libiconv/lib/tds565.h:
../deps/libiconv/lib/atarist.h:
../deps/libiconv/lib/riscos1.h:
../deps/libiconv/lib/cjk_variants.h:
../deps/libiconv/lib/translit.h:
../deps/libiconv/lib/encodings.def:
../deps/libiconv/lib/encodings_aix.def:
../deps/libiconv/lib/encodings_osf1.def:
../deps/libiconv/lib/encodings_dos.def:
../deps/libiconv/lib/encodings_extra.def:
../deps/libiconv/lib/encodings_local.def:
../deps/libiconv/lib/flags.h:
../deps/libiconv/lib/loops.h:
../deps/libiconv/lib/loop_unicode.h:
../deps/libiconv/lib/loop_wchar.h:
../deps/libiconv/lib/aliases.h:
../deps/libiconv/lib/aliases2.h:
../deps/libiconv/lib/aliases_aix.h:
../deps/libiconv/lib/aliases_osf1.h:
../deps/libiconv/lib/aliases_dos.h:
../deps/libiconv/lib/aliases_extra.h:
../deps/libiconv/lib/iconv_open1.h:
../deps/libiconv/lib/iconv_open2.h:
../deps/libiconv/lib/canonical.h:
../deps/libiconv/lib/canonical_aix.h:
../deps/libiconv/lib/canonical_osf1.h:
../deps/libiconv/lib/canonical_dos.h:
../deps/libiconv/lib/canonical_extra.h:
../deps/libiconv/lib/canonical_local.h:
